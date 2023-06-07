pipeline {
  agent any
  stages {
    stage('install') {
      parallel {
        stage('install') {
          steps {
            sh 'npm install'
          }
        }

        stage('node v') {
          steps {
            sh 'node -v'
          }
        }

      }
    }

  }
}