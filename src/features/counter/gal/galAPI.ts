import axios from "axios";
import { access } from "fs";
import { IImg } from "../../models/IImg";

const MYSERVR="http://127.0.0.1:8000/img"

export function getImages(access : string) {
   
  return new Promise<{ data: IImg[] }>((resolve) =>
    axios.get(MYSERVR, {
      headers: {
        'Authorization': `Bearer ${access}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then(res=> resolve({ data: res.data }))
  );
}

export function delImage(id:any) {
  return new Promise<{ data: IImg[] }>((resolve) =>
    axios.delete(MYSERVR + "/" + id.id , {
      headers: {
        'Authorization': `Bearer ${id.access}`
      }
    }).then(res=> resolve({ data: res.data }))
  );
}

