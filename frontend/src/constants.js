export const ACCESS_TOKEN='access';
export const REFRESH_TOKEN='refresh';
export const categories=[
    {
        id: "schools",
        displayname: "Schools",
        urlName: "getSchools"
    },
    {
        id: "kindergarden",
        displayname: "Kindergardens",
        urlName: 'getKindergarden'
    },
    {
        id: 'socialChildProjects',
        displayname: "Social Child Projects",
        urlName: 'getSocialChildProjects'
    },
    {
        id: "socialTeenagerProjects",
        displayname: "Social Teenager Projects",
        urlName: 'getSocialTeenagerProjects'
    },
]

export const generateURL = (url, params) => {
    console.log(url, params);
    return url.replace(/:(\w+)/g, (match, key) => {
        return params[key] !== undefined ? params[key] : match;
      });
}