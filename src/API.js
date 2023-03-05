
statuses = ['Pending', 'Running', 'Complete']

words = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur',
    'adipiscing', 'elit', 'curabitur', 'vel', 'hendrerit', 'libero',
    'eleifend', 'blandit', 'nunc', 'ornare', 'odio', 'ut',
    'orci', 'gravida', 'imperdiet', 'nullam', 'purus', 'lacinia',
    'a', 'pretium', 'quis', 'congue', 'praesent', 'sagittis',
    'laoreet', 'auctor', 'mauris', 'non', 'velit', 'eros',
    'dictum', 'proin', 'accumsan', 'sapien', 'nec', 'massa',
    'volutpat', 'venenatis', 'sed', 'eu', 'molestie', 'lacus',
    'quisque', 'porttitor', 'ligula', 'dui', 'mollis', 'tempus',
    'at', 'magna', 'vestibulum', 'turpis', 'ac', 'diam',
    'tincidunt', 'id', 'condimentum', 'enim', 'sodales', 'in',
    'hac', 'habitasse', 'platea', 'dictumst', 'aenean', 'neque',
    'fusce', 'augue', 'leo', 'eget', 'semper', 'mattis',
    'tortor', 'scelerisque', 'nulla', 'interdum', 'tellus', 'malesuada',
    'rhoncus', 'porta', 'sem', 'aliquet', 'et', 'nam',
    'suspendisse', 'potenti', 'vivamus', 'luctus', 'fringilla', 'erat',
    'donec', 'justo', 'vehicula', 'ultricies', 'varius', 'ante',
    'primis', 'faucibus', 'ultrices', 'posuere', 'cubilia', 'curae',
    'etiam', 'cursus', 'aliquam', 'quam', 'dapibus', 'nisl',
    'feugiat', 'egestas', 'class', 'aptent', 'taciti', 'sociosqu',
    'ad', 'litora', 'torquent', 'per', 'conubia', 'nostra',
    'inceptos', 'himenaeos', 'phasellus', 'nibh', 'pulvinar', 'vitae',
    'urna', 'iaculis', 'lobortis', 'nisi', 'viverra', 'arcu',
    'morbi', 'pellentesque', 'metus', 'commodo', 'ut', 'facilisis',
    'felis', 'tristique', 'ullamcorper', 'placerat', 'aenean', 'convallis',
    'sollicitudin', 'integer', 'rutrum', 'duis', 'est', 'etiam',
    'bibendum', 'donec', 'pharetra', 'vulputate', 'maecenas', 'mi',
    'fermentum', 'consequat', 'suscipit', 'aliquam', 'habitant', 'senectus',
    'netus', 'fames', 'quisque', 'euismod', 'curabitur', 'lectus',
    'elementum', 'tempor', 'risus', 'cras'
];

var db = {
    tasks: [],
    users: [
        { id: 0, firstName: "Ryan", lastName: "Christie", email: "rchristie@nucamp.co", group: { name: "Administrator" } },
        { id: 1, firstName: "John", lastName: "Doe", email: "jdoe@nucamp.co", group: { name: "Administrator" } },
        { id: 2, firstName: "Jane", lastName: "Meyer", email: "jmeyer@nucamp.co", group: { name: "Support" } },
        { id: 3, firstName: "Sam", lastName: "Black", email: "sblack@nucamp.co", group: { name: "Support" } },
        { id: 4, firstName: "Richard", lastName: "Austin", email: "raustin@nucamp.co", group: { name: "Tester" } },
        { id: 5, firstName: "Kimberly", lastName: "Berry", email: "kberry@nucamp.co", group: { name: "Administrator" } },
        { id: 6, firstName: "Ashley", lastName: "Bowen", email: "abowen@nucamp.co", group: { name: "Tester" } },
        { id: 7, firstName: "Sara", lastName: "Lane", email: "slane@nucamp.co", group: { name: "Developer" } },
        { id: 8, firstName: "Ken", lastName: "Fernandez", email: "kfernadez@nucamp.co", group: { name: "Developer" } },
        { id: 9, firstName: "Joe", lastName: "Thompson", email: "jthompson@nucamp.co", group: { name: "Tester" } },
        { id: 10, firstName: "Sean", lastName: "O'Reilly", email: "soreilly@nucamp.co", group: { name: "Developer" } },
        { id: 11, firstName: "Steve", lastName: "Davidson", email: "sdavison@nucamp.co", group: { name: "Tester" } },
        { id: 12, firstName: "Robert", lastName: "Chambers", email: "rchambers@nucamp.co", group: { name: "Support" } },
        { id: 13, firstName: "Bob", lastName: "Herrera", email: "bherrera@nucamp.co", group: { name: "Developer" } },
        { id: 14, firstName: "Hannah", lastName: "Chavez", email: "hchavez@nucamp.co", group: { name: "Developer" } },
        { id: 15, firstName: "Ben", lastName: "Grant", email: "bgrant@nucamp.co", group: { name: "Developer" } },
        { id: 16, firstName: "Tammy", lastName: "Spencer", email: "tspencer@nucamp.co", group: { name: "Developer" } },
        { id: 17, firstName: "Susan", lastName: "Curtis", email: "scurtis@nucamp.co", group: { name: "Tester" } },
        { id: 18, firstName: "Jen", lastName: "Stewart", email: "jstewart@nucamp.co", group: { name: "Support" } },
        { id: 19, firstName: "Kyle", lastName: "Ramirez", email: "kramirez@nucamp.co", group: { name: "Developer" } },
        { id: 20, firstName: "William", lastName: "Stevenson", email: "wstevenson@nucamp.co", group: { name: "Developer" } },
        { id: 21, firstName: "Tom", lastName: "Graves", email: "tgraves@nucamp.co", group: { name: "Developer" } },
        { id: 22, firstName: "Carly", lastName: "Fitzgerald", email: "cfitzgerald@nucamp.co", group: { name: "Developer" } },
        { id: 23, firstName: "Peter", lastName: "Burns", email: "pburns@nucamp.co", group: { name: "Support" } },
        { id: 24, firstName: "Paul", lastName: "Ross", email: "pross@nucamp.co", group: { name: "Tester" } },
        { id: 25, firstName: "Heather", lastName: "Scott", email: "hscott@nucamp.co", group: { name: "Developer" } },
        { id: 26, firstName: "Jacky", lastName: "Robinson", email: "jrobinson@nucamp.co", group: { name: "Support" } },
        { id: 27, firstName: "Marve", lastName: "Shepherd", email: "msheperd@nucamp.co", group: { name: "Tester" } },
        { id: 28, firstName: "Ron", lastName: "Gomez", email: "rgomez@nucamp.co", group: { name: "Tester" } }
    ],
    groups: [
        { name: 'Administrator', description: 'Administrative Group', rights: [{ name: 'ADMIN', description: 'Grants Adminstrative Access' }, { name: 'SBS', description: 'Grants Access SBS Data' }, { name: 'SFD', description: 'Grants Access SFD Data' }] },
        { name: 'Developer', description: 'Developer Group', rights: [{ name: 'SBS', description: 'Grants Access SBS Data' }, { name: 'SFD', description: 'Grants Access SFD Data' }] },
        { name: 'Support', description: 'Support Group', rights: [{ name: 'SBS', description: 'Grants Access SBS Data' }] },
        { name: 'Tester', description: 'Tester Group', rights: [{ name: 'SBS', description: 'Grants Access SBS Data' }, { name: 'RDR', description: 'Grants Access Radar Data' }] }
    ],
    rights: [
        { name: 'ADMIN', description: 'Grants Adminstrative Access' },
        { name: 'SBS', description: 'Grants Access SBS Data' },
        { name: 'RDR', description: 'Grants Access Radar Data' },
        { name: 'SFD', description: 'Grants Access SFD Data' }
    ],
    jobs: [
        { process: 0, startTime: RNGDate(), endTime: RNGDate(), schedule: 2048, updateTime: RNGDate(), status: 1 },
        { process: 0, startTime: RNGDate(), endTime: RNGDate(), schedule: 2048, updateTime: RNGDate(), status: 2 },
        { process: 0, startTime: RNGDate(), endTime: RNGDate(), schedule: 2048, updateTime: RNGDate(), status: 3 },
    ]
}

//Randomly create timestamps for users.
for (u of db.users) {
    u.updateTime = RNGDate();
    u.phone = "555-456-7890";
    u.routing = "XYZ-123";
    u.group = db.groups.find(g => g.name == u.group.name);
}

let pid = 0;
//Generate Tasks
for (let i = 0; i < 256; i++) {
    let pArray = [];
    let pCount = RNG(1,4);
    for(let j = 0; j < pCount; j++)
        pArray.push(CreateProcess(pid++));

    db.tasks.push({
        id: i,
        unread: i % 2,
        description: LoremIpsum(RNG(4, 10)),
        user: RNG(0, 28),
        updateTime: RNGDate(),
        startTime: RNGDate(),
        endTime: RNGDate(),
        status: statuses[RNG(0, 3)],
        processes: pArray
    });
}

function CreateProcess(id)
{
    let cJobs = RNG(5, 30);
    for(let j = 0; j < cJobs; j++)
        db.jobs.push({ process: id, startTime: RNGDate(), endTime: RNGDate(), schedule: 2048, updateTime: RNGDate(), status: RNG(1,4) }); 

    return {
        id: id,
        type: 0,
        filters: [
            { type: 7, value: 'SV|28,106,256' },
            { type: 7, value: 'Altitude|1000..4000' }
        ]
    }
}

function LoremIpsum(count) {
    let sArray = [];
    for (let i = 0; i < count; i++) {
        sArray.push(words[RNG(0, words.length)]);
    }

    return sArray.join(' ');
}

function SortUT(array) {
    array.sort((a, b) => new Date(b.updateTime) - new Date(a.updateTime));
    return array;
}

function RNGDate() {
    let d = new Date(Date.now());
    d.setTime(d.getTime() - RNG(5000, 10000000000));

    return d.toISOString();
}

function RNG(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function POST(path, data, done, fail) {
    switch (path) {
        case 'register':
            if (data.password == 'test')
                done();
            else
                fail();
            break;
    }

    //AJAX("POST", root + path, data, done, fail);
}

function GET(path, data, done, fail) {
    pArray = path.split('/');
    switch (pArray[0]) {
        case 'users':
            if (pArray[1]) {
                done(db.users.find(u => u.id == pArray[1]));
            } else {
                done(SortUT(db.users));
            }
            break;
        case 'jobs':
            if (pArray[1]) {
                done(db.jobs.filter(j => j.process == pArray[1]));
            }
            break;
        case 'groups':
            done(db.groups);
            break;
        case 'task':
            if (pArray[1]) {
                done(db.tasks.find(t => t.id == pArray[1]));
            }
            break;
        case 'tasks':
            if (pArray[1]) {
                done(db.tasks.filter(t => t.user == pArray[1]));
            } else {
                done(SortUT(db.tasks))
            }
            break;
        case 'rights':
            done(db.rights);
            break;
    }
}

function PUT(path, data, done, fail) {
    //AJAX("PUT", root + path, data, done, fail);
}

function PATCH(path, data, done, fail) {
   // AJAX("PATCH", root + path, data, done, fail);
}

