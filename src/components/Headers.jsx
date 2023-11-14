import defaul from '../assets/default-1.png';

const Headers = () => {
  return (
    <header className='w-full flex justif-center items-center flex-col'>
        <nav className='flex justify-between items-center w-full mb-10 pt-3'>
            <img src={defaul} alt='breifLogo' className='w-40 h-auto object-contain'/>
            {/* <button type='button' className='black_btn' onClick={() => {window.open('https://github.com/zeerakb1')}}>
                Github
            </button> */}
        </nav>

        <h1 className='head_text'>
            Get brief overview using <br className='max-mid:hidden'/>
            <span className='cyan_gradient'> OpenAI </span>
        </h1>

        <h2 className='desc'>
        Enhance your reading with precise, OpenAI-powered overviews—transforming articles and blogs into brief, understandable highlights for quick information gathering.
        </h2>
    </header>

  )
}

export default Headers
