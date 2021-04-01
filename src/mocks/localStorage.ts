const mockLocalStorage = (returnVal?: string) => {
  Object.defineProperty(global, 'localStorage', {
    value: {
      getItem: jest.fn().mockReturnValue(returnVal || ''),
      setItem: jest.fn(() => null),
      removeItem: jest.fn(() => null),
    },
    writable: true,
  });
};

export default mockLocalStorage;
