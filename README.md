# 🛡️ Safeherit Frontend

A secure digital asset inheritance platform that ensures your digital legacy is safely transferred to beneficiaries. Built with modern web technologies to provide a trustworthy and user-friendly interface for managing digital asset handoffs with death confirmation protocols.

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4+-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Security](https://img.shields.io/badge/Security-First-red?style=flat-square&logo=security&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 🎯 Overview

Safeherit is a comprehensive digital inheritance solution that allows users to securely store and transfer their digital assets to designated beneficiaries upon verified death confirmation. The platform ensures that your digital legacy—passwords, documents, crypto wallets, and other sensitive information—reaches the right people at the right time.

## ✨ Key Features

### 🔐 Security & Privacy
- **End-to-End Encryption**: All sensitive data is encrypted before storage
- **Multi-Factor Authentication**: Enhanced security with MFA support
- **Zero-Knowledge Architecture**: Service providers cannot access your data
- **Secure Asset Storage**: Encrypted storage for passwords, documents, and keys

### 👥 Beneficiary Management
- **Multiple Beneficiaries**: Designate different assets to different people
- **Conditional Access**: Set specific conditions for asset release
- **Beneficiary Verification**: Multi-step verification process for recipients
- **Asset Categories**: Organize digital assets by type and importance

### 📋 Death Confirmation System
- **Multiple Verification Methods**: Various ways to confirm death events
- **Trusted Contacts**: Designated individuals who can initiate confirmation
- **Document Verification**: Legal document upload and verification
- **Time-Based Triggers**: Automated systems for inactive accounts

### 📱 User Experience
- **Intuitive Dashboard**: Easy-to-use interface for asset management
- **Real-time Notifications**: Updates on system activities
- **Mobile Responsive**: Full functionality across all devices
- **Guided Setup**: Step-by-step onboarding process

## 🛠️ Technology Stack

- **Frontend Framework**: React 18+ with TypeScript
- **State Management**: Redux Toolkit
- **UI Components**:  Tailwind CSS
- **Routing**: React Router v6
- **Authentication**: JWT with refresh tokens
- **Encryption**: Web Crypto API
- **Build Tool**: Vite
- **Testing**: Jest, React Testing Library, Cypress

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn
- Git
- Modern web browser with Web Crypto API support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Malik-Haziq/Safeherit-frontend.git
   cd Safeherit-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```env
   REACT_APP_API_URL=http://localhost:3001
   REACT_APP_ENCRYPTION_KEY=your-encryption-key
   REACT_APP_AUTH_DOMAIN=your-auth-domain
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
Safeherit-frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   ├── Dashboard/
│   │   ├── Assets/
│   │   ├── Beneficiaries/
│   │   ├── Security/
│   │   └── UI/
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── AssetManagement.tsx
│   │   ├── BeneficiarySetup.tsx
│   │   └── Settings.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useEncryption.ts
│   │   └── useAssets.ts
│   ├── services/
│   │   ├── api.ts
│   │   ├── encryption.ts
│   │   └── auth.ts
│   ├── utils/
│   │   ├── validation.ts
│   │   ├── constants.ts
│   │   └── helpers.ts
│   ├── store/
│   ├── types/
│   ├── App.tsx
│   └── index.tsx
├── tests/
├── docs/
├── package.json
└── README.md
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript checks |

## 🔒 Security Features

### Data Protection
- **Client-Side Encryption**: All sensitive data encrypted before transmission
- **Secure Key Management**: Advanced key derivation and storage
- **Regular Security Audits**: Ongoing security assessments
- **GDPR Compliance**: Full compliance with data protection regulations

### Authentication & Authorization
- **Multi-Factor Authentication**: SMS, Email, and Authenticator app support
- **Role-Based Access**: Different permission levels for different users
- **Session Management**: Secure session handling with automatic expiration
- **Audit Logging**: Complete audit trail of all activities

## 📚 User Guides

### For Asset Owners
1. **Account Setup**: Create secure account with strong authentication
2. **Asset Addition**: Add and categorize your digital assets
3. **Beneficiary Setup**: Designate beneficiaries for each asset
4. **Verification Setup**: Configure death confirmation methods
5. **Regular Updates**: Keep asset information current

### For Beneficiaries
1. **Registration**: Create beneficiary account when notified
2. **Identity Verification**: Complete multi-step verification process
3. **Asset Access**: Access inherited assets after confirmation
4. **Support**: Get help throughout the inheritance process

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run e2e tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run preview
```

### Environment Variables
```env
REACT_APP_API_URL=https://api.safeherit.com
REACT_APP_ENCRYPTION_KEY=production-encryption-key
REACT_APP_AUTH_DOMAIN=auth.safeherit.com
REACT_APP_SENTRY_DSN=your-sentry-dsn
```

### Deployment Platforms
- **Vercel**: `vercel --prod`
- **Netlify**: Upload `build/` folder
- **AWS S3**: Deploy static files with CloudFront
- **Docker**: Use provided Dockerfile for containerization

## 🤝 Contributing

We welcome contributions to make Safeherit more secure and user-friendly!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write comprehensive tests for new features
- Maintain security-first development approach
- Update documentation for any API changes

## 📖 Documentation

- [API Documentation](./docs/api.md)
- [Security Architecture](./docs/security.md)
- [User Manual](./docs/user-guide.md)
- [Developer Guide](./docs/development.md)

## 🐛 Bug Reports

If you discover a security vulnerability, please send an email to security@safeherit.com instead of using the issue tracker.

For general bugs, please use the [GitHub Issues](https://github.com/Malik-Haziq/Safeherit-frontend/issues) page.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Malik Haziq**
- GitHub: [@Malik-Haziq](https://github.com/Malik-Haziq)
- LinkedIn: [Malik Haziq](your-linkedin-url)
- Email: [your-email@example.com](mailto:your-email@example.com)

## 🙏 Acknowledgments

- Security best practices from OWASP
- Encryption standards from industry leaders
- UI/UX inspiration from modern security applications
- Open source community for valuable tools and libraries


---

⭐ **Help us build a safer digital legacy platform - star this repository!** ⭐

**Remember**: This is a security-critical application. Always follow security best practices and never store sensitive data in plain text.
