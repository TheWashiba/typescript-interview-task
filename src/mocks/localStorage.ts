const mockLocalStorage = () => {
  Object.defineProperty(global, 'localStorage', {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => null),
    },
    writable: true,
  });
};

export default mockLocalStorage;
