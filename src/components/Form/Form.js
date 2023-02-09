import {useState} from 'react'

import styles from './form.module.scss'

const Form = () => {
    const [error, setError] = useState(false)
    const [bill, setBill] = useState('')
    const [tip, setTip] = useState('')
    const [perPErsonTip, setPerPersonTip] = useState(0)
    const [total, setTotal] = useState(0)
    const [people, setPeople] = useState('')


    const handleTip = (e) => {
        let tipValue = e.target.value
        setTip(tipValue)
    }

    const handleBill = (e) => {
        let people = +e.target.value
        if(people < 1) {
            setError(true)
            handleReset()
        } else {
            setError(false)
            setPeople(people)
            let tipPerPerson = bill * (tip / 100) /people
            let sum = (bill * (tip / 100) + bill) / people
            setTotal(Math.round((sum + Number.EPSILON) * 100) / 100)
            setPerPersonTip(Math.round((tipPerPerson + Number.EPSILON) * 100) / 100)
        }
    }

    const handleReset = () => {
        setBill('')
        setTip(0)
        setPeople('')
    }

  return (
    <div className={styles.splitter}>
        <div>
            <img src='/images/logo.svg' alt='logo'/>
        </div>
        <div className={styles.flexContainer}>
            <div className={styles.left}>
                <div className={styles.contentBill}>
                    <div className={styles.title}>
                        <span>Bill</span>
                        <div className={styles.billInput}>
                            <input 
                                type='number'
                                value={bill}
                                onChange={(e) => setBill(+e.target.value)}
                            />
                            <img src='/images/icon-dollar.svg' alt='dollar icon'/>
                        </div>
                    </div>
                    <div className={styles.selectors}>
                        <div className={styles.selectorsTitle}>
                            <span>Select Tip %</span>
                        </div>
                        <div className={styles.selectorsButtons}>
                            <button value={5} onClick={handleTip}>5%</button>
                            <button value={10} onClick={handleTip}>10%</button>
                            <button value={15} onClick={handleTip}>15%</button>
                            <button value={25} onClick={handleTip}>25%</button>
                            <button value={50} onClick={handleTip}>50%</button>
                            <input 
                                type='number' 
                                placeholder='Custom'
                                value={tip}
                                onChange={handleTip}    
                            />
                        </div>
                    </div>
                    <div className={styles.title}>
                        <div className={styles.titleHeader}>
                            <span>Number of People</span>
                            <span className={`${error ? styles.error : styles.hide}`}>Can't be zero</span>
                        </div>
                        <div className={styles.billInput}>
                            <input 
                                type='number'
                                value={people}
                                onChange={handleBill}
                            />
                            <img src='/images/icon-person.svg' alt='person icon'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.content}>
                    <div className={styles.tipAmount}>
                        <div className={styles.tipAmountData}>
                            <span>Tip Amount</span>
                            <p>/ person</p>
                        </div>
                        <span>$ {perPErsonTip}</span>
                    </div>
                    <div className={styles.tipTotal}>
                        <div className={styles.tipAmountData}>
                            <span>Total</span>
                            <p>/ person</p>
                        </div>
                        <span>$ {total}</span>
                    </div>
                    <button 
                        onClick={handleReset}
                        disabled={error}
                    >
                    Reset</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Form
