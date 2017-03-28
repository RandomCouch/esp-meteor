/* TOP MENU PAGES */
TopLinks = [
  {label: 'Manage Events', link:'/cms/events'},
  {label: 'Manage Users', link:'/cms/users'},
  {label: 'logout', link: '/cms/users/logout'},
  {label: 'sign-up', link: '/cms/users/signup'}
];
DefaultEventLinks = [
    {label: "Home", link:"/"},
    {label: "About", link:"/about"},
    {label: "Contact", link:"/contact"},
    {label: "Home", link:"/"},
    {label: "About", link:"/about"},
    {label: "Contact", link:"/contact"},
    {label: "Home", link:"/"},
    {label: "About", link:"/about"},
    {label: "Contact", link:"/contact"},
    {label: "Home", link:"/"},
    {label: "About", link:"/about"},
    {label: "Contact", link:"/contact"},
];
/* SCRIPTS & STYLESHEETS */
Links = [
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css',
    'https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css',
    '/stylesheets/style.css'
  ];
Scripts = [
    'https://code.jquery.com/jquery-2.1.4.js',
    'https://code.jquery.com/ui/1.11.4/jquery-ui.js',
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js'
  ];
/* SUBPAGES */
SubPagesMain = [
        {label:'Manage Events', link:'/cms/events'},
        {label:'Manage Users', link:'/cms/users'}
    ];
SubPagesEvents = [
                {label:'All Events', link:'/cms/events'},
                {label:'Archived Events', link:'/cms/events/archived'},
                {label:'Add an Event', link:'/cms/events/create'}
              ];
SubPagesUsers = [
        {label:'All Users', link:'/cms/users'},
        {label:'Add User', link:'/cms/users/create'}
    ];


/* Fields for events */
EventFields = [];
EventFields.push({label:"Event Code", type:"text"});
EventFields.push({label:"Event Directory", type:"text"});
EventFields.push({label:"Event Title", type:"text"});
EventFields.push({label:"Event Title (French)", type:"text"});
EventFields.push({label:"Event Description", type:"textarea"});
EventFields.push({label:"Event Description (French)", type:"textarea"});
EventFields.push({label:"Event Email", type:"text"});
EventFields.push({label:"Event Start Date", type:"date"});
EventFields.push({label:"Event End Date", type:"date"});
EventFields.push({label:"Location", type:"text"});
EventFields.push({label:"Tax Rate", type:"number"});
EventFields.push({label:"Tax Type", type:"select", options:['GST','HST']});

/* Fields for login */
LoginFields = [];
LoginFields.push({label:"Username", type:"text"});
LoginFields.push({label:"Password", type:"password"});

/* Fields for signup */
SignupFields = [];
SignupFields.push({label:"Username", type:"text"});
SignupFields.push({label:"Email", type:"text"});
SignupFields.push({label:"Password", type:"password"});