function FormSection(keyTypePairs) {
    let keys = Object.keys(keyTypePairs)
    let that = this;
    keys.forEach((key) => that[key] = keyTypePairs[key])
}
FormSection.prototype.returnKeys = function() {
    return Object.keys(this)
}
function createWorkPrototype() {
    return new FormSection({
        company: 'string',
        position: 'string',
        website: 'string',
        startData: 'string',
        endDate: 'string',
        summary: 'string',
        highlights: 'string-list'
    })
}
function createProfilePrototype(){
    return new FormSection({
        network: 'string',
        url: 'string',
        username: 'string'
    })
}

FormSection.prototype.createListObject = function (jsonkey, key) {
    var item;
    if(key ==='profiles') {
        item = createProfilePrototype()
    } else if (key === 'work') {
       item = createWorkPrototype() 
    }

    formJson[jsonkey][key].push(item)
    item.returnKeys().forEach((key) => $('#'+jsonkey).append(item.renderFormItem(key, jsonkey)));
}
FormSection.prototype.returnButton = function(key, jsonkey) {
    return "<button onClick='Basics.createListObject(\""+ jsonkey+"\", \"" + key + "\")'> Add </button>"    
}

FormSection.prototype.renderFormItem = function (key, jsonkey) {
    if(this[key] === 'string') {
        return '<h5 id=\''+key+'\'>'+key+'<br><input></h5>'
    } else if (this[key] === 'long-string') {
        return '<h5 id=\''+key+'\'>'+ key + '</h5><textarea></textarea>'
    } else if (Array.isArray(this[key])) {
       var heading = '<h5 id=\''+key+'\'>'+key+'</h5>';
       var button = this.returnButton(key, jsonkey)    
       return heading+button
    } else if (typeof(this[key]) ==='object') {  
        var subForm ='<h5 id=\''+key+'\'>'+key+'</h5>'
        var subHeadings = this[key].returnKeys();
        subHeadings.forEach((key) => {
             subForm += '<h6 id=\''+key+'\'>'+ key + '<input></h6>'
        })
        return subForm;
    }
};

function renderJson (object, jsonkey) {
  console.log(object, jsonkey)
  object.returnKeys().forEach((key) => $('#'+jsonkey).append(object.renderFormItem(key, jsonkey)))
}   

var Basics = new FormSection({
    name: 'string',
    label: 'string', 
    picture: 'string', 
    email: 'string',
    phone: 'string',
    website: 'string',
    summary: 'long-string',
    location: new FormSection({
        address: 'string',
        "postal code": 'string',
        city: 'string',
        "country code": 'string',
        region: 'string'
    }),
    profiles: []
});

var formJson = {}

formJson.basics = Basics
formJson.work = []
var form = $('#form')

//Test of Basics Section - Should be written up as an object method.
form.append('<div id=\'basics\'><h1 class=\'sectionHeading basics\'>Basics</h1>')
form.append('</div><div id=\'work\'><h1 class=\'sectionHeading work\'>Work</h1>')
Object.keys(formJson).forEach((key) => Array.isArray(formJson[key]) ? 
    formJson[key].length === 0 ? 
       null/* formJson[key].push(FormSection.createListObject(key)) */    :
        formJson[key].forEach((item) => renderJson(item)) : 
    renderJson(formJson[key], key) 
)
    

var resumeFormat = {
  "basics": {
    "name": "John Doe",
    "label": "Programmer",
    "picture": "",
    "email": "john@gmail.com",
    "phone": "(912) 555-4321",
    "website": "http://johndoe.com",
    "summary": "A summary of John Doe...",
    "location": {
      "address": "2712 Broadway St",
      "postalCode": "CA 94115",
      "city": "San Francisco",
      "countryCode": "US",
      "region": "California"
    },
    "profiles": {
      "network": "Twitter",
      "username": "john",
      "url": "http://twitter.com/john"
    }
  },
  "work": {
    "company": "Company",
    "position": "President",
    "website": "http://company.com",
    "startDate": "2013-01-01",
    "endDate": "2014-01-01",
    "summary": "Description...",
    "highlights": []
  },
  "volunteer": {
    "organization": "Organization",
    "position": "Volunteer",
    "website": "http://organization.com/",
    "startDate": "2012-01-01",
    "endDate": "2013-01-01",
    "summary": "Description...",
    "highlights": []
  },
  "education": {
    "institution": "University",
    "area": "Software Development",
    "studyType": "Bachelor",
    "startDate": "2011-01-01",
    "endDate": "2013-01-01",
    "gpa": "4.0",
    "courses": [],
  },
  "awards": {
    "title": "Award",
    "date": "2014-11-01",
    "awarder": "Company",
    "summary": "There is no spoon."
  },
  "publications": {
    "name": "Publication",
    "publisher": "Company",
    "releaseDate": "2014-10-01",
    "website": "http://publication.com",
    "summary": "Description..."
    },
  "skills": {
    "name": "Web Development",
    "level": "Master",
    "keywords": []
  },
  "languages": {
    "name": "English",
    "level": "Native speaker"
  },
  "interests": {
    "name": "Wildlife",
    "keywords": []
  },
  "references": {
    "name": "Jane Doe",
    "reference": "Reference..."
  }
}
var form = $('#form');

