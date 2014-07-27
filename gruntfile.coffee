module.exports = (grunt) ->
  # package.jsonを読み込み
  pkg = grunt.file.readJSON('package.json')

  grunt.initConfig
    # Directory Path
    dir:
      root: 'test/'
      sass: 'test/sass'
      css: 'test/css'
      js: 'test/js'
      img: 'test/images'

    #Jade Compile
    jade:
      compile:
        options:
          pretty: true
          data:
            year: '<%= grunt.template.today("yyyy") %>'
        files:
          "<%= dir.root %>/index.html": "<%= dir.root %>/index.jade"

    # Sass Compile
    sass:
      dist:
        options:
          style: 'expanded' #nested,compact,compressed,expandeds
        files:
          '<%= dir.css %>/style.css' : '<%= dir.sass %>/style.sass'

    # Mqpacker
    cmq:
      options:
        log: true
      main:
        files:
          '<%= dir.css %>/': ['<%= dir.css %>/*.css']

    # Vendor Prefix
    autoprefixer:
      options:
        browsers: [ "last 2 version","ie 8","ie 9" ]
      files:
        expand: true
        src: "<%= dir.css %>/*.css"
        dest: "<%= dir.css %>/"
        flatten: true

    # Monitoring
    watch:
      #sass
      sass:
        files: ['<%= dir.sass %>/*.sass']
        tasks: ['sass','autoprefixer','cmq']

      #css
      css:
        files: ['<%= dir.css %>/*.css','!<%= dir.css %>/min.css'] # ウォッチ対象として、ディレクトリ配下の*.cssを指定
        tasks: ['cssmin']

      html:
        files: ['<%= dir.root %>/**/*.jade']
        tasks: ['jade']

  # Package Load
  for taskName of pkg.devDependencies
    grunt.loadNpmTasks taskName  if taskName.substring(0, 6) is "grunt-"

  # Task Default
  grunt.registerTask "default", ['watch']