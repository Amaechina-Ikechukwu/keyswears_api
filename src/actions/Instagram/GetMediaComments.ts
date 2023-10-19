import axios from "axios";
import "dotenv/config";
async function GetUserInformation(
    instagramid: string,
    token: string
  ): Promise<string> {
    try {
      // const appId = process.env.CLIENT_ID;
      // const appSecret = process.env.CLIENT_SECRET;
      const yourAccessToken = token;
      const url = `https://graph.facebook.com/v18.0/${instagramid}?fields=name,profile_picture_url&access_token=${yourAccessToken}`;
  
      const response = await axios.get(url);
      const result = response.data;
  
      return result;
    } catch (error: any) {
      console.error(
        "Error while fetching IG long-lived user token:",
        error.message
      );
      throw new Error("Failed to fetch IG long-lived user token.");
    }
  }
async function GetUserMediaCommentObjects(media_id: string, token: string): Promise<any> {
  try {
    const url = `https://graph.facebook.com/v18.0/${media_id}/comments?access_token=${token}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error:any) {
    console.error("Error while fetching Media Comment Object:", error.message);
    throw new Error("Failed to fetch Media Comment Object.");
  }
}

async function GetCommentInformation(comment_id: string, token: string): Promise<any> {
  try {
    const url = `https://graph.facebook.com/v18.0/${comment_id}?fields=from,hidden,id,like_count,media,parent_id,replies,text,timestamp,user,username&access_token=${token}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error:any) {
    console.error("Error while fetching CommentData Data:", error.message);
    throw new Error("Failed to fetch CommentData Data.");
  }
}
// async function GetUserFullMediaData(media_id: string, token: string): Promise<any> {
//   try {
//     const url = `https://graph.facebook.com/v18.0/${media_id}?fields=id,ig_id,is_comment_enabled,is_shared_to_feed,like_count,media_product_type,media_type,media_url,owner,permalink,shortcode,thumbnail_url,timestamp,username,caption,comments_count&access_token=${token}`;
//     const response = await axios.get(url);
//     return response.data;
//   } catch (error:any) {
//     console.error("Error while fetching Media Full Data:", error.message);
//     throw new Error("Failed to fetch Media Full Data.");
//   }
// }

export default async function GetUserMediaComments( media_id: string, token: string,page_token:string): Promise<any[]> {
  try {
    
      const result = await GetUserMediaCommentObjects(media_id, token);
      const commentData:any[] = []
      for (const item of result.data) {
          
          const resultInformation = await GetCommentInformation(item.id, token)
        
          
            commentData.push(resultInformation)  
          
          
      }
      return commentData;
    

  } catch (error:any) {
    console.error("Error while fetching Media Data:", error.message);
    throw new Error("Failed to fetch Media Data.");
  }
}

