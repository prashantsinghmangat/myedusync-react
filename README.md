
# MyEduSync - Educational Platform

## Overview
MyEduSync is a comprehensive educational platform that connects students with expert tutors and provides access to high-quality study materials. The platform features course management, note sharing, and interactive learning experiences.

## Features
- **User Authentication**: Secure login and registration system
- **Course Management**: Browse and enroll in courses
- **Study Notes**: Access and share educational notes
- **Profile Management**: Detailed tutor and student profiles
- **Responsive Design**: Fully responsive interface for all devices

## Tech Stack
- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query for server state
- **Routing**: React Router v6
- **Icons**: Lucide React icons
- **UI Components**: Customized shadcn/ui components

## Project Structure
```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
├── lib/             # Utility functions
└── assets/          # Static assets
```

## Key Components

### Header
- Responsive navigation menu
- Dynamic user authentication state
- Profile icon for logged-in users
- Mobile-friendly hamburger menu

### Profile
- Tabbed interface for user information
- Account details management
- Education and experience history
- Password change functionality

### Notes
- List and grid views of study materials
- Detailed note viewing
- Tag-based organization
- Search and filter capabilities

## Styling Guidelines
- **Colors**: Uses a custom theme with primary indigo and accent colors
- **Typography**: Inter for sans-serif and Playfair Display for serif
- **Components**: Consistent use of shadcn/ui components
- **Animations**: Smooth transitions and hover effects

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Best Practices
- Component-based architecture
- TypeScript for type safety
- Responsive design principles
- Consistent error handling
- Performance optimization

## Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run type-check`: Run TypeScript checks

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.
