# ed-price-check

This program monitors the [Elite: Dangerous Data Network](https://github.com/EDCD/EDDN/wiki) (EDDN) for stations offering good prices for large quantities of painite.  When a commander reports such a station to EDDN, the program sends an alert to an Amazon SNS topic.

## Installation

Run `docker build -t ed-price-check:latest .` to create the Docker image.

## Usage

1. Create an SNS topic.

2. Subscribe to the SNS topic using an email address or phone number (SMS).

3. Create an IAM user with permission to publish to the SNS topic.  The account does not need to be able to log into the AWS console; only API access is required.

4. Set the following environment variables when running the container:
    
    - `AWS_DEFAULT_REGION`: the region in which the SNS topic was created, e.g., `us-east-1`
    
    - `TOPIC_ARN`: the SNS topic's Amazon resource name, e.g., `arn:aws:sns:us-east-1:123456789012:ed-price-check`

    - `AWS_ACCESS_KEY_ID`: the IAM user's access key ID, e.g., `AKIA1234567890ABCDEF`
    
    - `AWS_SECRET_ACCESS_KEY`: the IAM user's secret access key, e.g., `cGFzc3dvcmRwYXNzd29yZHBhc3N3b3JkcGFzc3dv`
    
For example:

```
(umask 077; touch .env)
cat > .env <<<EOF
AWS_DEFAULT_REGION=us-east-1
TOPIC_ARN=arn:aws:sns:us-east-1:123456789012:ed-price-check
AWS_ACCESS_KEY_ID=AKIA1234567890ABCDEF
AWS_SECRET_ACCESS_KEY=cGFzc3dvcmRwYXNzd29yZHBhc3N3b3JkcGFzc3dv
EOF
docker run -d --name ed-price-check --env-file .env \
    --restart unless-stopped ed-price-check:latest
```

## Contribution

### Forking the Project on GitHub

To contribute code to the project, you must have a GitHub account so you can push code to your own fork and open pull requests.  To create a GitHub account, follow the instructions [here](https://github.com/signup/free).

Afterwards, [fork](http://help.github.com/forking) the [main project repository][github].  Add your changes to a [topic branch](https://help.github.com/github/collaborating-with-issues-and-pull-requests/about-branches) in your fork, and [create a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork) when you are ready to contribute those changes to the project.

### Documentation Style Guidelines

TODO

### Code Style Guidelines

TODO

### Git Commit Guidelines

This project follows the [angular.js Git Commit Guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines), which leads to a more readable, more easily understood, and automatically curated [project history](CHANGELOG.md).

### Development Environment

TODO

### Release Engineering

This project uses [semantic-release](https://www.npmjs.com/package/semantic-release) to control the timing, content, and audience of published releases.

## Design and Implementation

### Theory of Operation

The program filters the EDDN data stream for station market data.  It will only send one alert per station per day.  It does not store any market data.

## References

https://github.com/EDSM-NET/EDDN/wiki
