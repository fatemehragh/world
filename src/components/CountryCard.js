import React from 'react';
// next
import Image from 'next/image';
import Link from 'next/link';
//styles
import styles from '../styles/CountryCard.module.css';

//----------------------------------------------------------------

const CountryCard = (props) => {
    const country = props.country;

    return (
        <Link href={`/country/${country.name.common}`}>
                <div className={styles['country-card-container']}>
                    <div className={styles['country-card-image-container']}>
                        <Image src={country.flags['svg']} alt={country.flags['alt']} width={350} height={300}/>
                    </div>
                    <div>
                        <div className={styles['country-card-name']}>
                            {country.name.common}
                        </div>
                        <div><span>Population:</span> <span>{country['population'].toLocaleString()}</span></div>
                        <div><span>Region: </span><span>{country['region']}</span></div>
                        <div><span>capital: </span> <span>{country['capital']}</span></div>
                    </div>
                </div>
        </Link>
    )
}
export default CountryCard
