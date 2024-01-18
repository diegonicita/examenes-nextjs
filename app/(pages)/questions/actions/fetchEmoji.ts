const API_KEY = "20h5gOmVQSePhQfe9f5KCA==w6yxrwIi7n8ZjxwM";

export default async function fetchEmoji(group:{group:string | undefined}) {
  if (group !== undefined) {
    return await fetch(`https://api.api-ninjas.com/v1/emoji?group=${group}`, {
      headers: { "X-Api-key": API_KEY },
    })
      .then((response) => {
        // if(!response.ok) {
        //     throw new Error("data fail")
        // }
        return console.log(response.json());
      })

      .catch((error) => console.error(error));
  }
}
