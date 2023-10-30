import Realm from 'realm';

const subjectSchema = {
    name: 'subject',
    properties: {
        name: {type: 'string', default: ''},
        cardFront: {type: 'list', objectType: 'string'},
        cardBack: {type: 'list', objectType: 'string'},
    }
}

const realmInstance = new Realm({ schema: [subjectSchema], schemaVersion: 2});

export default realmInstance;