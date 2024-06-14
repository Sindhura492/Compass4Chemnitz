export const generateURL = (url, params) => {
    return url.replace(/:(\w+)/g, (match, key) => {
        return params[key] !== undefined ? params[key] : match;
    });
}

const parseLanguages = (ele) => {
    return ele.SPRACHEN === 'nan' || ele.SPRACHEN === ' '
}

export const generalJson = (arr) => {
    let response = [];
    arr.map((ele) => {
        let element = {
            ID: ele.ID,
            X: ele.X,
            Y: ele.Y,
            OBJECTID: ele.OBJECTID,
            TYPE: ele.TYP ? ele.TYP != 'nan' ? ele.TYP : 'No Data Provided': 'No Data Provided',
            ART: ele.ART ? ele.ART != 'nan' ? ele.ART : 'No Data Provided': 'No Data Provided',
            LOCATION_TYPE: ele.STANDORTTYP ? ele.STANDORTTYP != 'nan' ? ele.STANDORTTYP : 'No Data Provided': 'No Data Provided',
            DESCRIPTION: ele.BEZEICHNUNG ? ele.BEZEICHNUNG != 'nan' ? ele.BEZEICHNUNG : 'No Data Provided': 'No Data Provided',
            DESCRIPTION_ADDITION: ele.BEZEICHNUNGZUSATZ ? ele.BEZEICHNUNGZUSATZ != 'nan' ? ele.BEZEICHNUNGZUSATZ : 'No Data Provided': 'No Data Provided',
            SHORT_DESCRIPTION: ele.KURZBEZEICHNUNG ? ele.KURZBEZEICHNUNG != 'nan' ? ele.KURZBEZEICHNUNG : 'No Data Provided': 'No Data Provided',
            STREET: ele.STRASSE ? ele.STRASSE != 'nan' ? ele.STRASSE : 'No Data Provided': 'No Data Provided',
            POSTCODE: ele.PLZ ? ele.PLZ != 'nan' ? ele.PLZ : 'No Data Provided': 'No Data Provided',
            LOCATION: ele.ORT ? ele.ORT != 'nan' ? ele.ORT : 'No Data Provided': 'No Data Provided',
            PHONE: ele.TELEFON ? ele.TELEFON != 'nan' ? ele.TELEFON : 'No Data Provided': 'No Data Provided',
            FAX: ele.FAX ? ele.FAX != 'nan' ? ele.FAX : 'No Data Provided': 'No Data Provided',
            EMAIL: ele.EMAIL ? ele.EMAIL != 'nan' ? ele.EMAIL : 'No Data Provided': 'No Data Provided',
            PROFILE: ele.PROFILE ? ele.PROFILE != 'nan' ? ele.PROFILE : 'No Data Provided': 'No Data Provided',
            LANGUAGES: parseLanguages(ele) ? 'No Data Provided' : ele.SPRACHEN,
            WWW: ele.WWW ? ele.WWW != 'nan' ? ele.WWW : 'No Data Provided': 'No Data Provided',
            TRAEGER: ele.TRAEGER ? ele.TRAEGER != 'nan' ? ele.TRAEGER : 'No Data Provided': 'No Data Provided',
            TRAEGERTYP: ele.TRAEGERTYP ? ele.TRAEGERTYP != 'nan' ? ele.TRAEGERTYP : 'No Data Provided': 'No Data Provided',
            BEZUGNR: ele.BEZUGNR ? ele.BEZUGNR != 'nan' ? ele.BEZUGNR : 'No Data Provided': 'No Data Provided',
            AREA_TYPE_NUMBER: ele.GEBIETSARTNUMMER ? ele.GEBIETSARTNUMMER != 'nan' ? ele.GEBIETSARTNUMMER : 'No Data Provided': 'No Data Provided',
            SNUMMER: ele.SNUMMER ? ele.SNUMMER != 'nan' ? ele.SNUMMER : 'No Data Provided': 'No Data Provided',
            NUMBER: ele.NUMMER ? ele.NUMMER != 'nan' ? ele.NUMMER : 'No Data Provided': 'No Data Provided',
            GlobalID: ele.GlobalID ? ele.GlobalID != 'nan' ? ele.GlobalID : 'No Data Provided': 'No Data Provided',
            CreationDate: ele.CreationDate ? ele.CreationDate != 'nan' ? ele.CreationDate : 'No Data Provided': 'No Data Provided',
            Creator: ele.Creator ? ele.Creator != 'nan' ? ele.Creator : 'No Data Provided': 'No Data Provided',
            EditDate: ele.EditDate ? ele.EditDate != 'nan' ? ele.EditDate : 'No Data Provided': 'No Data Provided',
            Editor: ele.Editor ? ele.Editor != 'nan' ? ele.Editor : 'No Data Provided': 'No Data Provided',
            is_favourite: ele.is_favorite,
            category: ele.category
        };
        response.push(element);
    })
    return response;

}


export const parseFavouriteData = (arr) => {
    let response = [];
    if(!(arr instanceof Array)){
        return null
    }
        arr.map((ele) => {
            let element = {
                id: ele.id,
                DESCRIPTION: ele.BEZEICHNUNG ? ele.BEZEICHNUNG != 'nan' ? ele.BEZEICHNUNG : 'No Description Provided': 'No Description Provided',
                SHORT_DESCRIPTION: ele.KURZBEZEICHNUNG ? ele.KURZBEZEICHNUNG != 'nan' ? ele.KURZBEZEICHNUNG : 'No Data Provided': 'No Data Provided',
                STREET: ele.STRASSE ? ele.STRASSE != 'nan' ? ele.STRASSE : 'No Data Provided': 'No Data Provided',
                POSTCODE: ele.PLZ ? ele.PLZ != 'nan' ? ele.PLZ : 'No Data Provided': 'No Data Provided',
                LOCATION: ele.ORT ? ele.ORT != 'nan' ? ele.ORT : 'No Data Provided': 'No Data Provided',
                PHONE: ele.TELEFON ? ele.TELEFON != 'nan' ? ele.TELEFON : 'No Data Provided': 'No Data Provided',
                EMAIL: ele.EMAIL ? ele.EMAIL != 'nan' ? ele.EMAIL : 'No Data Provided': 'No Data Provided',
                TRAEGER: ele.TRAEGER ? ele.TRAEGER != 'nan' ? ele.TRAEGER : 'No Data Provided': 'No Data Provided',
                CreationDate: ele.CreationDate ? ele.CreationDate != 'nan' ? ele.CreationDate : 'No Data Provided': 'No Data Provided',
                category: ele.category,
                user: ele.user,
                item: ele.item
            };
            response.push(element);
        })
    return response;

}