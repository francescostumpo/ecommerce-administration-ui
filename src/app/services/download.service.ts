import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }

  // tslint:disable-next-line:typedef
  downloadFile(response: ArrayBuffer, mimeType: string, fileName: string) {
    const file = new Blob([response], {type: mimeType});
    const url = window.URL || window.webkitURL;
    const element = document.createElement('a');
    element.setAttribute('href', url.createObjectURL(file));
    element.setAttribute('download', fileName);

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
