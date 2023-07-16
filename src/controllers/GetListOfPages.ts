import axios,{AxiosRequestConfig} from 'axios'
class GetUserPages {
	public async ListOfPages(userId:string,token:string):Promise<string[]>{
		try{
			const headers:AxiosRequestConfig['headers']={
				"Content-Type":'application/json',
				"Authorization":`Bearer ${token}`
			}
		const response = await axios.get(`https://graph.facebook.com/${userId}/accounts`,{headers})
		return response.data;

		}
	catch(error:any){
		throw new Error("Error fetching data: " + error)
	}
	}
}
export default GetUserPages;