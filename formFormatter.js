function FormSection(keyTypePairs) {
    let keys = Object.keys(keyTypePairs)
    let that = this;
    keys.forEach((key) => that[key] = keyTypePairs[key])
}
FormSection.prototype.returnKeys = function() {
    return Object.keys(this)
}

function createBasicPrototype() {
    return new FormSection({
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
}
function genericSection(object) {
    var proto = new FormSection({})
    Object.keys(object).forEach((key) => proto[key] = object[key])
    return proto
}
const work = {
        company: 'string',
        position: 'string',
        website: 'string',
        startData: 'string',
        endDate: 'string',
        summary: 'long-string',
        highlights: 'long-string'
}
function createProfilePrototype(){
    return new FormSection({
        network: 'string',
        url: 'string',
        username: 'string'
    })
}
const volunteer = {
        organization: 'string',
        position: 'string',
        website: 'string',
        startDate: 'string',
        endDate: 'string',
        summary: 'string',
        highlights: 'long-string'
}
const education = {
        institution: 'string',
        area: 'string',
        studyType: 'string',
        startDate: 'string',
        endDate: 'string',
        gpa: 'string',
        courses: 'long-string'
}
const awards = {
        title: 'string',
        date: 'string',
        awarder: 'string',
        summary: 'long-string'
}
const publications = {
    "name": "string",
    "publisher": "string",
    "releaseDate": "string",
    "website": "string",
    "summary": "long-string"
}
const skills = {
    "name": "string",
    "level": "string",
    "keywords": "long-string"
}
const languages = {
    "name": "string",
    "level": "string"
}
const interests = {
    "name": "string",
    "keywords": "long-string"
}
const references = {
    "name": "string",
    "reference": "long-string"
}
FormSection.prototype.createListObject = function (jsonkey, key, object) {
    var item;
    if(key ==='profiles') {
        item = createProfilePrototype()
        formJson[jsonkey][key].push(item)
    } 
    else {
        console.log(formJson)
      key === 'work' ? item = genericSection(work) : null
      key === 'volunteer' ? item = genericSection(volunteer) : null
      key === 'education' ? item = genericSection(education) : null
      key === 'awards' ? item = genericSection(awards) : null
      key === 'publications' ? item = genericSection(publications) : null
      key === 'skills' ? item = genericSection(skills) : null
      key === 'languages' ? item = genericSection(languages) : null
      key === 'interests' ? item = genericSection(interests) : null
      key === 'references' ? item = genericSection(references): null
      formJson[key].push(item)
    }
    item.returnKeys().forEach((key) => $('#'+jsonkey).append(item.renderFormItem(key, jsonkey)));
}
FormSection.prototype.returnButton = function(key, jsonkey) {
    return "<button onClick='formJson.createListObject(\""+ jsonkey+"\", \"" + key + "\")'> Add </button>"    
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
  if (object['basics']) {
    $('#'+jsonkey).append(object.renderFormItem(jsonkey, jsonkey))
  } else {
    object.returnKeys().forEach((key) => $('#'+jsonkey).append(object.renderFormItem(key, jsonkey)))
  }
}   

//Set up form json object
var formJson = new FormSection({})
formJson.basics = createBasicPrototype();
formJson.work = []
formJson.volunteer = []
formJson.education = []
formJson.awards = []
formJson.publications = []
formJson.skills = []
formJson.languages = []
formJson.interests = []
formJson.references = []

//set up divs for form sections
var form = $('#form')
form.append('<div id=\'basics\'><h1 class=\'sectionHeading basics\'>Basics</h1>')
form.append('</div><div id=\'work\'><h1 class=\'sectionHeading work\'>Work</h1>')
form.append('</div><div id=\'volunteer\'><h1 class=\'sectionHeading volunteer\'>Volunteer</h1>')
form.append('</div><div id=\'education\'><h1 class=\'sectionHeading education\'>Education</h1>')
form.append('</div><div id=\'awards\'><h1 class=\'sectionHeading awards\'>Awards</h1>')
form.append('</div><div id=\'publications\'><h1 class=\'sectionHeading publications\'>Publications</h1>')
form.append('</div><div id=\'skills\'><h1 class=\'sectionHeading skills\'>Skills</h1>')
form.append('</div><div id=\'languages\'><h1 class=\'sectionHeading languages\'>Languages</h1>')
form.append('</div><div id=\'interests\'><h1 class=\'sectionHeading interests\'>Interests</h1>')
form.append('</div><div id=\'references\'><h1 class=\'sectionHeading languages\'>References</h1>')
//iterate through object and build form
Object.keys(formJson).forEach((key) => Array.isArray(formJson[key]) ? 
    formJson[key].length === 0 ? 
        renderJson(formJson, key) : 
        formJson[key].forEach((item) => renderJson(item)) : 
    renderJson(formJson[key], key) 
)
    
/*
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
*/
