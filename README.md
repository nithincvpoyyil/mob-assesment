# Package Challenge

[![https://linkedin.com/in/nithincv][linkedin-shield]][linkedin-url]

<br />
<div align="center">

  <h3 align="center">Package Challenge</h3>

  <p align="center">
    You want to send your friend a package with different things.
    <br />
    
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This is a NodeJS npm package which takes input file path and generate output file with best package indexes for distribution. This package soltuion is based on `BestFit Decreasing BinPack algorithm`, which is a NP problem in Computer Science.
Since this is an approximation alogirthm, it `won't yeild the optimal solution` for the problem. reference: <a href="https://www.youtube.com/watch?v=qbuMPi44bVQ" target="_blank"> BinPack algorithms</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With


<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/>
<img src="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white"/>


<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

- NodeJS v18 +
- npm 
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/nithincvpoyyil/mob-assesment.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

Enter your API in `config.js`
   ```js
    const Packer = require("mob-assesment/index");
    /* Packer.pack() function creates output file 
      and returns Promise<Array<Package>> as well */
    const packages = await Packer.pack(inputFilePath,inputFilePath);
    console.log(Packer.toResultArray(packages)); // optional result
   ```



## License

Distributed under the MIT License.





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/nithincv

