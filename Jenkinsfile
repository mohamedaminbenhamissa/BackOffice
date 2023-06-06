pipeline {
  agent any
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub')
  }
  stages {
    stage('Build') {
      steps {
        bat 'docker build -t mohamedaminbenhamissa/jenkins-docker-hub .'
      }
    }
    stage('Login') {
      steps {
        script {
          def credentials = bat(script: 'echo %DOCKERHUB_CREDENTIALS_PSW%', returnStdout: true).trim()
          bat "echo ${credentials} | docker login -u %DOCKERHUB_CREDENTIALS_USR% --password-stdin dckr_pat_vBK5fgDwfm1HA9PmgaZCXW_VGKc"
        }
      }
    }
    stage('Push') {
      steps {
        bat 'docker push mohamedaminbenhamissa/jenkins-docker-hub'
      }
    }
  }
  post {
    always {
      bat 'docker logout'
    }
  }
}
