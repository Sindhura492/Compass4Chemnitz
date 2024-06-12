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
            TYPE: ele.TYP ? ele.TYP != 'nan' ? ele.TYP : null: null,
            ART: ele.ART ? ele.ART != 'nan' ? ele.ART : null: null,
            LOCATION_TYPE: ele.STANDORTTYP ? ele.STANDORTTYP != 'nan' ? ele.STANDORTTYP : null: null,
            DESCRIPTION: ele.BEZEICHNUNG ? ele.BEZEICHNUNG != 'nan' ? ele.BEZEICHNUNG : null: null,
            DESCRIPTION_ADDITION: ele.BEZEICHNUNGZUSATZ ? ele.BEZEICHNUNGZUSATZ != 'nan' ? ele.BEZEICHNUNGZUSATZ : null: null,
            SHORT_DESCRIPTION: ele.KURZBEZEICHNUNG ? ele.KURZBEZEICHNUNG != 'nan' ? ele.KURZBEZEICHNUNG : null: null,
            STREET: ele.STRASSE ? ele.STRASSE != 'nan' ? ele.STRASSE : null: null,
            POSTCODE: ele.PLZ ? ele.PLZ != 'nan' ? ele.PLZ : null: null,
            LOCATION: ele.ORT ? ele.ORT != 'nan' ? ele.ORT : null: null,
            PHONE: ele.TELEFON ? ele.TELEFON != 'nan' ? ele.TELEFON : null: null,
            FAX: ele.FAX ? ele.FAX != 'nan' ? ele.FAX : null: null,
            EMAIL: ele.EMAIL ? ele.EMAIL != 'nan' ? ele.EMAIL : null: null,
            PROFILE: ele.PROFILE ? ele.PROFILE != 'nan' ? ele.PROFILE : null: null,
            LANGUAGES: parseLanguages(ele) ? null : ele.SPRACHEN,
            WWW: ele.WWW ? ele.WWW != 'nan' ? ele.WWW : null: null,
            TRAEGER: ele.TRAEGER ? ele.TRAEGER != 'nan' ? ele.TRAEGER : null: null,
            TRAEGERTYP: ele.TRAEGERTYP ? ele.TRAEGERTYP != 'nan' ? ele.TRAEGERTYP : null: null,
            BEZUGNR: ele.BEZUGNR ? ele.BEZUGNR != 'nan' ? ele.BEZUGNR : null: null,
            AREA_TYPE_NUMBER: ele.GEBIETSARTNUMMER ? ele.GEBIETSARTNUMMER != 'nan' ? ele.GEBIETSARTNUMMER : null: null,
            SNUMMER: ele.SNUMMER ? ele.SNUMMER != 'nan' ? ele.SNUMMER : null: null,
            NUMBER: ele.NUMMER ? ele.NUMMER != 'nan' ? ele.NUMMER : null: null,
            GlobalID: ele.GlobalID ? ele.GlobalID != 'nan' ? ele.GlobalID : null: null,
            CreationDate: ele.CreationDate ? ele.CreationDate != 'nan' ? ele.CreationDate : null: null,
            Creator: ele.Creator ? ele.Creator != 'nan' ? ele.Creator : null: null,
            EditDate: ele.EditDate ? ele.EditDate != 'nan' ? ele.EditDate : null: null,
            Editor: ele.Editor ? ele.Editor != 'nan' ? ele.Editor : null: null,
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
                DESCRIPTION: ele.BEZEICHNUNG ? ele.BEZEICHNUNG != 'nan' ? ele.BEZEICHNUNG : null: null,
                SHORT_DESCRIPTION: ele.KURZBEZEICHNUNG ? ele.KURZBEZEICHNUNG != 'nan' ? ele.KURZBEZEICHNUNG : null: null,
                STREET: ele.STRASSE ? ele.STRASSE != 'nan' ? ele.STRASSE : null: null,
                POSTCODE: ele.PLZ ? ele.PLZ != 'nan' ? ele.PLZ : null: null,
                LOCATION: ele.ORT ? ele.ORT != 'nan' ? ele.ORT : null: null,
                PHONE: ele.TELEFON ? ele.TELEFON != 'nan' ? ele.TELEFON : null: null,
                EMAIL: ele.EMAIL ? ele.EMAIL != 'nan' ? ele.EMAIL : null: null,
                TRAEGER: ele.TRAEGER ? ele.TRAEGER != 'nan' ? ele.TRAEGER : null: null,
                CreationDate: ele.CreationDate ? ele.CreationDate != 'nan' ? ele.CreationDate : null: null,
                category: ele.category,
                user: ele.user,
                item: ele.item
            };
            response.push(element);
        })
    return response;

}