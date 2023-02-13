import { HttpParams, HttpClient } from "@angular/common/http";

export class UploadAdapter {
  constructor(
    private loader: any,
    public url:string,
    private http:HttpClient
  ) {
  }


//the uploadFile method use to upload image to your server
  // @ts-ignore
  uploadFile(file: any,url?:string, user:string | Blob){
    let name = '';
    url='https://staging.naiparq.co.ke/api/v2/blog/article/';
    let formData:FormData = new FormData();
    let headers = new Headers();
    name = file.name;
    formData.append('attachment', file, name);
    const dotIndex = name.lastIndexOf('.');
    const fileName  = dotIndex>0?name.substring(0,dotIndex):name;
    formData.append('name', fileName);
    formData.append('source', user);

    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    console.log('formData',formData);
    let params = new HttpParams();
    const options = {
      params: params,
      reportProgress: true,
    };
//http post return an observer
//so I need to convert to Promise
    return this.http.post(url,formData,options);
  }
//implement the upload
  upload() {
    let upload = new Promise((resolve, reject)=>{
      this.loader['file'].then(
        (data: any)=>{

          this.uploadFile(data,this.url,'test')
            .subscribe(
              (result) => {
                // @ts-ignore
                resolve({ default: result['attachment'] })
              },
              (error)=>{
                reject(data.msg);
              }
            );
        }
      );
    });
    return upload;
  }
  abort() {
    console.log("abort")
  }
}
