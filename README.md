<div align="center">

# 🚀 React.js Setup Guide

<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="120" alt="React Logo"/>

### *Get your React project up and running in minutes!*

---

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-9+-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)

</div>

---

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running Your Project](#-running-your-project)
- [Common Commands](#-common-commands)
- [Troubleshooting](#-troubleshooting)

---

## ✅ Prerequisites

<table>
  <tr>
    <th>Requirement</th>
    <th>Version</th>
    <th>Check Command</th>
  </tr>
  <tr>
    <td>🟢 Node.js</td>
    <td>18.x or higher</td>
    <td><code>node --version</code></td>
  </tr>
  <tr>
    <td>📦 npm</td>
    <td>9.x or higher</td>
    <td><code>npm --version</code></td>
  </tr>
</table>

> 💡 **Tip:** Download Node.js from [nodejs.org](https://nodejs.org) — npm comes bundled with it!

---

## 📥 Installation

### Step 1: Clone or Navigate to Your Project

```bash
cd your-project-folder
```

### Step 2: Install Dependencies

```bash
npm install
```

<details>
<summary>🔍 <strong>What does this do?</strong></summary>

<br/>

This command reads the `package.json` file and installs all listed dependencies into a `node_modules` folder.

| File | Purpose |
|------|---------|
| `package.json` | Lists all project dependencies |
| `package-lock.json` | Locks exact versions for consistency |
| `node_modules/` | Contains all installed packages |

</details>

---

## ▶️ Running Your Project

### Start the Development Server

```bash
npm run dev
```

<div align="center">

### 🎉 Your app is now running!

| Environment | URL |
|-------------|-----|
| 🌐 Local | `http://localhost:3000` |
| 📡 Network | `http://192.168.x.x:3000` |

</div>

> ⚡ **Hot Reload:** Any changes you make will automatically refresh in the browser!

---

## 🛠️ Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Install a specific package
npm install package-name

# Install as dev dependency
npm install package-name --save-dev

# Remove a package
npm uninstall package-name
```

---

## 🔧 Troubleshooting

<details>
<summary>❌ <strong>"Module not found" error</strong></summary>

```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

</details>

<details>
<summary>❌ <strong>Port 3000 already in use</strong></summary>

```bash
# Kill the process on port 3000
npx kill-port 3000

# Or run on a different port
npm run dev -- --port 3001
```

</details>

<details>
<summary>❌ <strong>Permission errors on npm install</strong></summary>

```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

</details>

---

<div align="center">



---

<div align="center">

### 🌟 Happy Coding!

Made with ❤️ for React developers

---

<sub>Need help? Check out the [React Docs](https://react.dev) or [Next.js Docs](https://nextjs.org/docs)</sub>

</div>
