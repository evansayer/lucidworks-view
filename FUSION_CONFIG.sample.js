appConfig = { //eslint-disable-line
  // If you don't know what you want for some configuration items,
  // leave them as-is and see what happens in UI.
  // You may need to clear browser history/cache before your changes take affect.

  // localhost is used here for same computer use only.
  // You will need to put a hostname or ip address here if you want to go to
  // view this app from another machine.
  // @type string
  host: 'http://localhost',
  port:'8764',

  /**
   * The name of the realm to connect with
   *   default: 'native'
   */
  connectionRealm: 'native',

  // Allow anyone to use this search app without logging in.
  AllowAnonymousAccess: true,
  // If allow AllowAnonymousAccess is set to true the authorizationHeader field must also be set.
  // The text after 'Basic' is a base64 encoded username and password
  // in the format of admin:password123.
  anonymous_access: {
      username: 'anonymous_search',
      password: 'password123'
  },
  authorizationHeader: {
    'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='
    // WARNING: using this default setting in a production app is not recommended.
  },
  // In order to get your own auth header with username password please run
  // gulp setupAuthHeader --username <username> --password <password> --realm <realm name> --hostname <hostname or IP, port optional>
  // Defaults: username=admin, password=password123, realm=native, hostname=localhost:8764

  // The name of your collection
  collection: 'MyCollection',

  // Please specify a pipeline or profile that you want to leverage with this UI.
  queryPipelineIdList: ['default'],
  queryProfilesIdList: ['default'],
  use_query_profile: true, // Force use of query-profile

  // Search UI Title
  // This title appears in a number of places in the app, including page title, and header.
  searchAppTitle: 'Fusion Seed App',

  /**
   * Document display
   *
   * These parameters change the field that is displayed in the document.
   * You can also add additional fields by editing the document template.
   * Document template is located at:
   *   your_project_directory/client/assets/components/document/document.html
   */
  //In search results, for each doc, display this field as the head field
  head_field: 'title',
  subhead_field: 'subtitle',
  description_field: 'description',
  //In search results, for each doc, use this field to generate link value when a user clicks on head_field
  head_url_field: 'url',
  //In search results, display a image in each doc page
  image_field: 'image',
  //In doc page, display a image with each doc
  image_enabled: true,

  // ADDING ADDITIONAL FIELDS TO DOCUMENTS
  //
  // There are 2 ways to add additional fields to the ui.
  // You can either use settings to create a simple list of values with field
  // names or you can edit the html/css, which is far more robust and allows
  // for more customization.
  //
  // SIMPLE CONFIG BASED FIELD DISPLAY
  //
  // This is the simpler option, but wont look as good.
  // It creates a list of field names next to field results
  // in the format of:
  // field label: field result
  //
  // In order to add items to the list you must add the fields to
  // fields_to_display. You can change the label of any field by adding a
  // field mapping in field_display_labels
  //
  // FLEXIBLE HTML FIELD DISPLAY
  //
  // For more advanced layouts edit the document template this provides a great
  // deal of flexibility and allows you to add more complex logic to your results.
  // You are able to use basic javascript to show hide, or alter the display of
  // any or multiple results.
  //
  // The HTML/Angular template is located in the following directory:
  //    your_project_directory/client/assets/components/document/document.html
  fields_to_display:['title','id','name'],
  field_display_labels: {
    'name': 'Document Name',
    //'id': 'Identification Number'
    // you can add as many lines of labels as you want
  },

  /**
   * Signals
   *
   * Allow the collection of data regaurding search results. The most typical use
   * case is to track click signals for a collection.
   */
  // Signal type for title click.
  signalType: 'click',
  // This specifies the index pipeline that will be used to submit signals.
  signalsPipeline: '_signals_ingest', // '_signals_ingest' is the fusion default.
  // Should be a unique field per document in your collection.
  // used by signals as a reference to the main collection.
  signalsDocumentId: 'id',

  /**
   * Spellcheck
   *
   * Allow the interface to inform users when it is possible they made a mistake.
   * In the interface this looks like "Did you mean y?" when you do a query for x.
   *
   * NOTE: Spellcheck will not work unless the requestHandler and dictionary are
   * configured in solrconfig.xml
   */
  spellcheck_enabled: false,
  // Must be configured in solrconfig.xml
  spellcheck_requesthandler: 'spell',
  // Must be configured in solrconfig.xml
  spellcheck_dictionary: 'default_text',

  /**
   * Typeahead
   *
   * Typeahead or autocomplete shows you a number of suggested queries as you
   * type in the search box.
   */
  typeahead_use_query_profile: true,
  typeaheadQueryPipelineIdList: ['default'],
  typeahaedQueryProfilesIdList: ['default'],
  typeahead_fields: ['id'],
  typeahead_requesthandler: 'select'

};
