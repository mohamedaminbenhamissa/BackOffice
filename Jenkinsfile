pipeline {
  agent any
  

    
    stage('Build Docker Image') {
      steps {
        bat 'docker build -t backoffice:v2 .'
      }
    }
    
    stage('Deploy') {
      steps {
        bat 'docker run -it -p 8085:80 backoffice:v2'
      }
    }
  }
}
