pipeline {
  agent any
  environment {
    VERSION = ""
    REPO = "chauminh1212/sirena-be"
    DOCKER_CREDENTIAL = 'e53caa92-7791-4e02-9cd5-5f60554301fe'
    SERVER_CREDENTIAL = 'a38d3353-b170-44b5-bac3-ff29263bfa1d'
  }
  stages {
    stage('Install jq') {
      steps {
        script {
          // Cài đặt jq nếu chưa có
          sh 'apt-get update && apt-get install -y jq'
        }
      }
    }
    stage('Check and Increment Tag') {
      steps {
        script {
          // Lấy tag mới nhất từ Docker Hub
          def tag = sh(script: "curl -s 'https://hub.docker.com/v2/repositories/${REPO}/tags/?page_size=1' | jq -r \'.results[].name\'", returnStdout: true).trim()
          echo "Tag hiện tại là: ${tag}"

          // Split tag thành hai phần: major và minor
          def parts = tag.split("\\.")
          def major = parts[0].toInteger()
          def minor = parts[1].toInteger()

          // Kiểm tra nếu minor = 9 thì tăng major và đặt minor = 0
          if (minor == 9) {
            major += 1
            minor = 0
          } else {
            // Tăng minor nếu minor < 9
            minor += 1
          }

          // Tạo tag mới
          def newTag = "${major}.${minor}"

          // Gán giá trị cho biến môi trường VERSION
          VERSION = newTag
        }
      }
    }
    stage('Build and push image') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIAL) {
            sh "docker build --platform linux/amd64  -t ${REPO}:${VERSION} ."
            sh "docker push ${REPO}:${VERSION}"
          }
        }
      }
    }
    stage('Deploy to server') {
      steps {
        script {
          def remote = [: ]
          remote.name = 'server'
          remote.host = '164.92.192.55'
          remote.allowAnyHosts = true

          withCredentials([usernamePassword(credentialsId: SERVER_CREDENTIAL, usernameVariable: 'SSH_USER', passwordVariable: 'SSH_PASSWORD')]) {
            // Gán thông tin vào đối tượng remote
            remote.user = SSH_USER
            remote.password = SSH_PASSWORD

            // Thực thi lệnh trên server remote
            sshCommand(remote: remote, command: """
                cd /home/sirena_be
                export TAG="${VERSION}" && docker compose up -d
            """)
          }

          echo "Complete!!!!"
        }
      }
    }
    
  }
}