export const generateURL = (url, params) => {
    return url.replace(/:(\w+)/g, (match, key) => {
        return params[key] !== undefined ? params[key] : match;
    });
}

const parseLanguages = (ele) => {
    return ele.SPRACHEN === 'nan' || ele.SPRACHEN === ' '
}

const formatPhoneNumber = (number) => {
    // Remove non-digit characters
    const digits = number.replace(/\D/g, '');
    
    // Add +49 country code if missing
    if (digits.startsWith('0')) {
      return digits.substring(1);
    } else if (digits.startsWith('49')) {
      return digits.substring(2);
    } else {
      return digits; // For numbers that are already in the correct format
    }
  };

  const processPhoneNumbers = (phoneNumbers) => {
    if (phoneNumbers === null || phoneNumbers === 'nan') {
        return null;
    }
    // Extract phone numbers and remove extra spaces and quotes
    const rawNumbers = phoneNumbers
      .replace(/["']/g, '')
      .split(/\s+/)
      .filter(num => num.length > 0); // filter out any empty strings

    // Format each phone number
    const formatted = rawNumbers.map(formatPhoneNumber);
    const phoneNumberArray = [];
    let temp = ''
    formatted.map((number, index) => {
        if (index%2 == 0) {
            if(temp != ''){
                phoneNumberArray.push(Number(temp))
            }
            temp = ''
        }
        temp += number
    })
    phoneNumberArray.push(Number(temp))
    return phoneNumberArray;
  }

export const generalJson = (arr) => {
    let response = [];
    arr.map((ele) => {
        let element = {
            ID: ele.ID,
            X: ele.X,
            Y: ele.Y,
            OBJECTID: ele.OBJECTID,
            TYPE: ele.TYP ? ele.TYP != 'nan' ? ele.TYP : 'No Data Provided' : 'No Data Provided',
            ART: ele.ART ? ele.ART != 'nan' ? ele.ART : 'No Data Provided' : 'No Data Provided',
            LOCATION_TYPE: ele.STANDORTTYP ? ele.STANDORTTYP != 'nan' ? ele.STANDORTTYP : 'No Data Provided' : 'No Data Provided',
            DESCRIPTION: ele.BEZEICHNUNG ? ele.BEZEICHNUNG != 'nan' ? ele.BEZEICHNUNG : 'No Data Provided' : 'No Data Provided',
            DESCRIPTION_ADDITION: ele.BEZEICHNUNGZUSATZ ? ele.BEZEICHNUNGZUSATZ != 'nan' ? ele.BEZEICHNUNGZUSATZ : null : null,
            SHORT_DESCRIPTION: ele.KURZBEZEICHNUNG ? ele.KURZBEZEICHNUNG != 'nan' ? ele.KURZBEZEICHNUNG : null : null,
            STREET: ele.STRASSE ? ele.STRASSE != 'nan' ? ele.STRASSE : 'No Data Provided' : 'No Data Provided',
            POSTCODE: ele.PLZ ? ele.PLZ != 'nan' ? ele.PLZ : 'No Data Provided' : 'No Data Provided',
            LOCATION: ele.ORT ? ele.ORT != 'nan' ? ele.ORT : 'No Data Provided' : 'No Data Provided',
            PHONE: processPhoneNumbers(ele.TELEFON),
            FAX: ele.FAX ? ele.FAX != 'nan' ? ele.FAX : null : null,
            EMAIL: ele.EMAIL ? ele.EMAIL != 'nan' ? ele.EMAIL : null : null,
            PROFILE: ele.PROFILE ? ele.PROFILE != 'nan' ? ele.PROFILE : null : null,
            LANGUAGES: parseLanguages(ele) ? null : ele.SPRACHEN,
            WWW: ele.WWW ? ele.WWW != 'nan' ? ele.WWW : null : null,
            TRAEGER: ele.TRAEGER ? ele.TRAEGER != 'nan' ? ele.TRAEGER : null : null,
            TRAEGERTYP: ele.TRAEGERTYP ? ele.TRAEGERTYP != 'nan' ? ele.TRAEGERTYP : null : null,
            BEZUGNR: ele.BEZUGNR ? ele.BEZUGNR != 'nan' ? ele.BEZUGNR : null : null,
            AREA_TYPE_NUMBER: ele.GEBIETSARTNUMMER ? ele.GEBIETSARTNUMMER != 'nan' ? ele.GEBIETSARTNUMMER : null : null,
            SNUMMER: ele.SNUMMER ? ele.SNUMMER != 'nan' ? ele.SNUMMER : null : null,
            NUMBER: ele.NUMMER ? ele.NUMMER != 'nan' ? ele.NUMMER : null : null,
            GlobalID: ele.GlobalID ? ele.GlobalID != 'nan' ? ele.GlobalID : null : null,
            CreationDate: ele.CreationDate ? ele.CreationDate != 'nan' ? ele.CreationDate : null : null,
            Creator: ele.Creator ? ele.Creator != 'nan' ? ele.Creator : null : null,
            EditDate: ele.EditDate ? ele.EditDate != 'nan' ? ele.EditDate : null : null,
            Editor: ele.Editor ? ele.Editor != 'nan' ? ele.Editor : null : null,
            is_favorite: ele.is_favorite,
            category: ele.category
        };
        response.push(element);
    })
    return response;

}


export const parseFavoriteData = (arr) => {
    let response = [];
    if (!(arr instanceof Array)) {
        return null
    }
    arr.map((ele) => {
        let element = {
            id: ele.id,
            DESCRIPTION: ele.BEZEICHNUNG ? ele.BEZEICHNUNG != 'nan' ? ele.BEZEICHNUNG : 'No Description Provided' : 'No Description Provided',
            SHORT_DESCRIPTION: ele.KURZBEZEICHNUNG ? ele.KURZBEZEICHNUNG != 'nan' ? ele.KURZBEZEICHNUNG : 'No Data Provided' : 'No Data Provided',
            STREET: ele.STRASSE ? ele.STRASSE != 'nan' ? ele.STRASSE : 'No Data Provided' : 'No Data Provided',
            POSTCODE: ele.PLZ ? ele.PLZ != 'nan' ? ele.PLZ : 'No Data Provided' : 'No Data Provided',
            LOCATION: ele.ORT ? ele.ORT != 'nan' ? ele.ORT : 'No Data Provided' : 'No Data Provided',
            PHONE: ele.TELEFON ? ele.TELEFON != 'nan' ? ele.TELEFON : 'No Data Provided' : 'No Data Provided',
            EMAIL: ele.EMAIL ? ele.EMAIL != 'nan' ? ele.EMAIL : 'No Data Provided' : 'No Data Provided',
            TRAEGER: ele.TRAEGER ? ele.TRAEGER != 'nan' ? ele.TRAEGER : 'No Data Provided' : 'No Data Provided',
            CreationDate: ele.CreationDate ? ele.CreationDate != 'nan' ? ele.CreationDate : 'No Data Provided' : 'No Data Provided',
            category: ele.category,
            user: ele.user,
            item: ele.item
        };
        response.push(element);
    })
    return response;

}