export const ArrowUpRight = ({
  className = 'w-5 h-5',
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) => (
  <svg
    xmlns='https://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke={color}
    className={className}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25'
    />
  </svg>
);

export const DownArrow = ({
  className = 'w-5 h-5',
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) => (
  <svg
    xmlns='https://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke={color}
    className={className}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3'
    />
  </svg>
);

export const SearchIcon = ({
  className = 'w-5 h-5',
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) => (
  <svg
    xmlns='https://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke={color}
    className={className}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
    />
  </svg>
);

export const HomeIcon = ({
  className = 'w-5 h-5',
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) => (
  <svg
    xmlns='https://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke={color}
    className={className}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
    />
  </svg>
);

export const ChevronDownIcon = ({
  className = 'w-5 h-5',
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) => (
  <svg
    xmlns='https://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke={color}
    className={className}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M19.5 8.25l-7.5 7.5-7.5-7.5'
    />
  </svg>
);

export const MapIcon = ({
  className = 'w-5 h-5',
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) => (
  <svg
    xmlns='https://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke={color}
    className={className}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
    />
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
    />
  </svg>
);

export const ClockIcon = ({
  className = 'w-5 h-5',
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) => (
  <svg
    xmlns='https://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke={color}
    className={className}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
    />
  </svg>
);

export const SquareIcon = ({
  className = 'w-5 h-5',
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) => (
  <svg
    xmlns='https://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke={color}
    className={className}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z'
    />
  </svg>
);

export const CardIcon = ({
  className = 'w-5 h-5',
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) => (
  <svg
    xmlns='https://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke={color}
    className={className}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z'
    />
  </svg>
);

export const HeartIconOutline = ({
  className = 'w-5 h-5',
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) => (
  <svg
    xmlns='https://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke={color}
    className={className}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
    />
  </svg>
);

export const PaperPlane = ({
  className = 'w-5 h-5',
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) => (
  <svg
    xmlns='https://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke={color}
    className={className}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
    />
  </svg>
);

export const PlayIcon = ({
  className = 'w-5 h-5',
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) => (
  <svg
    xmlns='https://www.w3.org/2000/svg'
    width={800}
    height={800}
    fill='none'
    className={className}
    viewBox='0 0 24 24'
  >
    <path
      fill={color}
      d='M8.286 3.407A1.5 1.5 0 0 0 6 4.684v14.632a1.5 1.5 0 0 0 2.286 1.277l11.888-7.316a1.5 1.5 0 0 0 0-2.555L8.286 3.407z'
    />
  </svg>
);

export const ThreeDots = ({
  className = 'w-5 h-5',
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) => (
  <svg
    xmlns='https://www.w3.org/2000/svg'
    width='800'
    height='800'
    fill={color}
    className={`flex items-center ${className}`}
    data-name='Layer 1'
    viewBox='0 0 16 16'
  >
    <path
      d='M8 6.5A1.5 1.5 0 116.5 8 1.5 1.5 0 018 6.5zM.5 8A1.5 1.5 0 102 6.5 1.5 1.5 0 00.5 8zm12 0A1.5 1.5 0 1014 6.5 1.5 1.5 0 0012.5 8z'
      className='cls-1'
    ></path>
  </svg>
);

export const Steering = ({
  className = 'w-5 h-5',
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) => (
  <svg
    xmlns='https://www.w3.org/2000/svg'
    fill={color}
    version='1.1'
    viewBox='0 0 295.238 295.238'
    xmlSpace='preserve'
    className={className}
  >
    <path d='M147.619 0C66.219 0 0 66.224 0 147.619s66.219 147.619 147.619 147.619 147.619-66.224 147.619-147.619S229.019 0 147.619 0zm0 285.714c-76.143 0-138.095-61.948-138.095-138.095S71.476 9.524 147.619 9.524s138.095 61.948 138.095 138.095-61.952 138.095-138.095 138.095z'></path>
    <path d='M255.7 129.952l.019-.019-.024-.024c-8.495-51.995-53.714-91.814-108.076-91.814S48.038 77.914 39.548 129.91l-.024.024.019.019a109.693 109.693 0 00-1.448 17.667c0 60.39 49.129 109.524 109.524 109.524s109.524-49.133 109.524-109.524c0-6.015-.51-11.915-1.443-17.668zM147.619 47.619c45.295 0 83.6 30.295 95.852 71.671-26.952-20.957-62.348-33.576-95.852-33.576-33.504 0-68.895 12.619-95.852 33.581 12.252-41.381 50.557-71.676 95.852-71.676zM53.752 181.771c6.643-5.852 24.314-19.867 41.486-19.867 17.357 0 28.571 13.086 28.571 33.333 0 19.348-9.495 36.629-14.69 44.652-25.638-10.737-45.79-31.894-55.367-58.118zm132.358 58.124c-5.2-8.005-14.681-25.243-14.681-44.657 0-20.248 11.214-33.333 28.571-33.333 17.124 0 34.829 14.019 41.481 19.876-9.576 26.219-29.729 47.376-55.371 58.114zm58.415-68.043c-9.086-7.448-26.533-19.471-44.524-19.471-22.429 0-38.095 17.624-38.095 42.857 0 20.49 9.048 38.405 15.005 47.986a99.71 99.71 0 01-29.29 4.395 99.718 99.718 0 01-29.292-4.395c5.957-9.581 15.005-27.495 15.005-47.986 0-25.233-15.667-42.857-38.095-42.857-17.99 0-35.438 12.024-44.524 19.471-1.948-7.776-3.095-15.862-3.095-24.233 0-4.452.395-8.805.962-13.105 26.052-24.276 63.662-39.276 99.038-39.276 35.381 0 72.99 15 99.038 39.276.567 4.3.962 8.652.962 13.105 0 8.371-1.148 16.457-3.095 24.233z'></path>
    <path d='M147.619 109.523c-13.129 0-23.81 10.681-23.81 23.81s10.681 23.81 23.81 23.81 23.81-10.681 23.81-23.81-10.681-23.81-23.81-23.81zm0 38.096c-7.876 0-14.286-6.41-14.286-14.286s6.41-14.286 14.286-14.286 14.286 6.41 14.286 14.286c0 7.876-6.41 14.286-14.286 14.286zM286.052 68.438l8.843-3.538c-9.919-24.814-39.562-54.462-59.433-64.4L231.2 9.019c17.971 8.986 45.848 36.9 54.852 59.419z'></path>
    <path d='M104.762 128.571H114.286V138.095H104.762z'></path>
    <path d='M180.952 128.571H190.476V138.095H180.952z'></path>
    <path d='M133.333 266.667H142.857V276.191H133.333z'></path>
    <path d='M152.381 266.667H161.905V276.191H152.381z'></path>
    <path d='M9.186 226.8l-8.843 3.538c9.924 24.81 39.567 54.462 59.433 64.395l4.262-8.519C46.067 277.233 18.19 249.319 9.186 226.8z'></path>
  </svg>
);

export const WatsappIcon = ({
  className = 'w-5 h-5',
}: {
  className?: string;
}) => (
  <svg
    xmlns='https://www.w3.org/2000/svg'
    viewBox='0 0 175.216 175.552'
    className={className}
  >
    <defs>
      <linearGradient
        id='b'
        x1='85.915'
        x2='86.535'
        y1='32.567'
        y2='137.092'
        gradientUnits='userSpaceOnUse'
      >
        <stop offset='0' stopColor='#57d163' />
        <stop offset='1' stopColor='#23b33a' />
      </linearGradient>
      <filter
        id='a'
        width='1.115'
        height='1.114'
        x='-.057'
        y='-.057'
        colorInterpolationFilters='sRGB'
      >
        <feGaussianBlur stdDeviation='3.531' />
      </filter>
    </defs>
    <path
      fill='#b3b3b3'
      d='m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0'
      filter='url(#a)'
    />
    <path
      fill='#fff'
      d='m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z'
    />
    <path
      fill='url(#linearGradient1780)'
      d='M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z'
    />
    <path
      fill='url(#b)'
      d='M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z'
    />
    <path
      fill='#fff'
      fillRule='evenodd'
      d='M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647'
    />
  </svg>
);

export const ShareIcon = ({
  className = 'w-5 h-5',
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) => (
  <svg
    xmlns='https://www.w3.org/2000/svg'
    className={className}
    fill='none'
    viewBox='0 0 24 24'
    stroke={color}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'
    />
  </svg>
);

export const SaveIcon = ({
  className = 'w-5 h-5',
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) => (
  <svg
    xmlns='https://www.w3.org/2000/svg'
    className={className}
    fill='none'
    viewBox='0 0 24 24'
    stroke={color}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
    />
  </svg>
);
