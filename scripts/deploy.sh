if [ -z "$1" ]
then
    echo "Please provide a random identifier"
    exit 1
fi

let "randomIdentifier=$1"

yarn build
func azure functionapp publish msdocs-serverless-function-$randomIdentifier