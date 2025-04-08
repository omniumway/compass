export default {
    content: [
      './layouts/**/*.html',
      './content/**/*.md'
    ],
    theme: {
      extend: {
        colors: {
          simplicity: '#3B82F6', // Blue
          patience: '#4CAF50',   // Green
          compassion: '#9333EA', // Purple
          background: '#F8FAFC',
          cardface: '#FFFFFF'
        },
        fontFamily: {
          heading: ['Montserrat', 'sans-serif'],
          body: ['Open Sans', 'sans-serif']
        }
      }
    },
    plugins: [
      require('@tailwindcss/typography'),
      require('daisyui')
    ],
    daisyui: {
      themes: [
        {
          nord: {
            "primary": "#5E81AC",
            "secondary": "#81A1C1",
            "accent": "#88C0D0",
            "neutral": "#4C566A",
            "base-100": "#ECEFF4",
            "base-200": "#E5E9F0", 
            "base-300": "#D8DEE9",
            "info": "#B48EAD",
            "success": "#A3BE8C",
            "warning": "#EBCB8B",
            "error": "#BF616A",
          },
          sunset: {
            "primary": "#F87171",
            "secondary": "#FB7185",
            "accent": "#C084FC",
            "neutral": "#1F2937",
            "base-100": "#111827",
            "base-200": "#1F2937",
            "base-300": "#374151",
            "info": "#60A5FA",
            "success": "#34D399",
            "warning": "#FBBF24",
            "error": "#DC2626",
          }
        }
      ],
      darkTheme: "sunset",
    }
  }

