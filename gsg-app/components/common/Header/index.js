import Head from 'next/head'


export default function Header({ title }) {

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Get Set Go Quizz Application App" />
            </Head>

        </div>
    )

}