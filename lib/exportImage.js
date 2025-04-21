export const bufferImage = (buffer) => {
    return `data:image/jpeg;base64,${Buffer.from(buffer).toString('base64')}`;
  };
;