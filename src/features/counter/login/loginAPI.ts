import axios from "axios";
import ICred from "../../models/Cred";
const MY_SERVER="http://127.0.0.1:8000/login/"

export function login(cred: ICred) {
    return new Promise<{ data: any }>((resolve) =>
      axios.post(MY_SERVER , cred).then(res => resolve({ data: res.data }))
    );
  }
  