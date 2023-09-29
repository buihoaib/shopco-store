import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='flex flex-col bg-stone-100 text-black text-center justify-center flex-1'>
            <p className='text-3xl font-bold uppercase'>Page not found</p>
            <p>We could not find the page you were looking for.</p>
            <p>Go back to the <Link href='/' className='hover:opacity-50 underline'>homepage</Link>.</p>
        </div>
    )
}
