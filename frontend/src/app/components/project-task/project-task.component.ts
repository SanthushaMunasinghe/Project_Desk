import { Component, Input } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.css'],
})
export class ProjectTaskComponent {
  @Input() taskId: string = '';
  @Input() taskFile: string = '';
  @Input() taskIndex: string = '';
  @Input() taskTitle: string = '';
  @Input() taskDescription: string = '';
  @Input() taskStatus: string = '';

  errorTxt: string = '';

  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.selectedFile = target.files[0];
    }
  }

  onSubmit() {
    this.errorTxt = '';

    if (!this.selectedFile) {
      console.log('No file selected');
      this.errorTxt = 'No file selected';
      return;
    }

    const fileExtension = this.selectedFile.name.slice(
      ((this.selectedFile.name.lastIndexOf('.') - 1) >>> 0) + 2
    );
    const modifiedFile = new File(
      [this.selectedFile],
      `${this.taskId}.${fileExtension}`
    );

    const formData = new FormData();

    formData.append('file', modifiedFile);
    formData.append('taskId', this.taskId);

    this.http
      .post('/api/task/upload', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.errorTxt = 'Uploading';
          } else if (event.type === HttpEventType.Response) {
            console.log(event);
            this.errorTxt = 'Uploaded';
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  downloadFile() {
    const fileName = this.taskFile;
    const updatedFilePath = fileName.slice(7);
    console.log(updatedFilePath);
    this.http
      .get(`/api/task/download/${updatedFilePath}`, { responseType: 'blob' })
      .subscribe(
        (response) => {
          const blob = new Blob([response], {
            type: 'application/octet-stream',
          });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = updatedFilePath;
          a.click();
        },
        (error) => {
          console.log(error.error);
        }
      );
  }
}
