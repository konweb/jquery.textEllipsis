module.exports = (grunt) ->
  # package.jsonを読み込み
  pkg = grunt.file.readJSON('package.json')

  grunt.initConfig
    # Directory Path
    dir:
      root: 'test/'
      sass: 'test/sass'
      css: 'test/css'

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
      options:
        livereload: true

      #sass
      sass:
        files: ['<%= dir.sass %>/*.sass']
        tasks: ['sass','autoprefixer','cmq']

      html:
        files: ['<%= dir.root %>/**/*.html']

  # Package Load
  for taskName of pkg.devDependencies
    grunt.loadNpmTasks taskName  if taskName.substring(0, 6) is "grunt-"

  # Task Default
  grunt.registerTask "default", ['watch']