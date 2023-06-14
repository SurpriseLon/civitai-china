[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Apache License 2.0][license-shield]][license-url]
[![Discord][discord-shield]][discord-url]

<br />
<div align="center">
  <a href="https://civitai.com/">
    <img src="media/logo.png" alt="Civitai Logo" width="120" height="auto">
  </a>
</div>

## Table of Content
- [About the Project](#about-the-project)
  - [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Important Scripts](#important-scripts)
- [Contributing](#contributing)
- [Sponsors](#sponsors)
- [License](#license)

## 关于该项目

本项目的目标是创建一个平台，让人们可以分享他们的稳定扩散模型（文本反转、超网络、美学梯度、变分自动编码器以及其他人们用来定制AI生成的疯狂方法），与他人合作改进这些模型，并互相学习。该平台允许用户创建账户，上传他们的模型，并浏览他人分享的模型。用户还可以在彼此的模型上留下评论和反馈，以促进合作和知识共享。

### 技术栈

我们使用了一系列现代Web技术来构建这个项目，其中包括Next.js作为前端框架，TRPC作为API工具，以及Prisma和Postgres作为数据库。通过利用这些工具，我们成功创建了一个可扩展和易于维护的平台，既用户友好又功能强大。

- **数据库:** Prisma + Postgres
- **API:** tRPC
- **前后端:** NextJS
- **UI Kit:** [Mantine](https://mantine.dev/)
- **空间:** Cloudflare

## 入门指南

若要在本地运行并进行简单示例操作，请按照以下步骤进行操作：

### 准备

首先，请确保您的计算机已安装以下内容：
- Node.js (18或者以上)
- Docker (运行数据库)

> 我们建议您安装`nvm`，以便设置正确的Node版本来运行此项目。
> ```sh
> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
> ```

### 安装

请按照以下步骤在本地机器上进行操作：

1. 将存储库克隆到您的本地机器。
2. 在项目目录中运行`npm install`，安装所需的依赖项。
3. 使用`docker-compose up -d`启动所需的服务。
   * 注意：除了PostgreSQL和Redis外，这还将自动运行用于电子邮件的maildev和用于S3存储的minio，并自动创建所有必要的存储桶。尽管minio和maildev不是强制性的，但在测试和开发过程中它们是首选。
4. 通过从`.env-example`文件中复制内容创建您的`.env`文件。
   * 大多数默认值都已配置为与docker-compose设置配合工作，除了S3上传密钥和密钥。要生成这些，请访问minio的Web界面[http://localhost:9000](http://localhost:9000)，使用默认用户名和密码`minioadmin`，然后导航到"Access Keys"选项卡。点击"Create Access Key"，并将生成的密钥和密钥复制到`.env`文件中。
   * 将`WEBHOOK_TOKEN`设置为您选择的随机字符串。这将用于对webhook端点的请求进行身份验证。
5. 运行`npm run db:migrate`来运行所有数据库迁移。
6. 运行`npm run db:generate`以生成Prisma客户端。
7. 运行`npm run dev`启动开发服务器。
8. 访问页面`http://localhost:3000/api/webhooks/run-jobs?token=WEBHOOK_TOKEN&run=update-metrics`以启动度量更新作业（确保替换`WEBHOOK_TOKEN`）。
9. 最后，访问[http://localhost:3000](http://localhost:3000)以查看网站。
   * 请注意，帐户创建将通过maildev发送电子邮件，可以在[http://localhost:1080](http://localhost:1080)访问maildev。
   * 还请注意，为了使图像上传工作，需要Cloudflare凭据。

请根据您的具体情况进行相应的安装和设置。

### 重要脚本
```sh
docker-compose up -d # Spin up db, redis, maildev, and minio

npm run dev # Start the dev environment

npm run db:migrate -- --name migration-name # Create a database migration with prisma after updating the schema

npm run db:generate # Generates local prisma client

npm run db:ui # Start Prisma Studio to manage the database content

npm run build # Build the NextJS project
```

## Contributing

Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the repository to your own GitHub account.
1. Create a new branch for your changes.
1. Make your changes to the code.
1. Commit your changes and push the branch to your forked repository.
1. Open a pull request on our repository.

## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website.

## License
Apache License 2.0 - Please have a look at the [LICENSE](/LICENSE) for more details.


[contributors-shield]: https://img.shields.io/github/contributors/civitai/civitai.svg?style=for-the-badge
[contributors-url]: https://github.com/civitai/civitai/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/civitai/civitai.svg?style=for-the-badge
[forks-url]: https://github.com/civitai/civitai/network/members
[stars-shield]: https://img.shields.io/github/stars/civitai/civitai.svg?style=for-the-badge
[stars-url]: https://github.com/civitai/civitai/stargazers
[issues-shield]: https://img.shields.io/github/issues/civitai/civitai.svg?style=for-the-badge
[issues-url]: https://github.com/civitai/civitai/issues
[license-shield]: https://img.shields.io/github/license/civitai/civitai.svg?style=for-the-badge
[license-url]: https://github.com/civitai/civitai/blob/master/LICENSE
[discord-shield]: https://img.shields.io/discord/1037799583784370196?style=for-the-badge
[discord-url]: https://discord.gg/UwX5wKwm6c
