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
        withCredentials([string(credentialsId: 'dockerhub', variable: 'DOCKERHUB_CREDENTIALS_PSW')]) {
          bat """
            echo %DOCKERHUB_CREDENTIALS_PSW% | docker login -u %DOCKERHUB_CREDENTIALS_USR% --password-stdin
          """
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
