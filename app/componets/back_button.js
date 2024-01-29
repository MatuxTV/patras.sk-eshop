'use client'
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <button className='flex text-h4 m-10 font-plus-jakarta' onClick={goBack}>--Spat</button>
  );
};

export default BackButton;