import {useState} from 'react'

import Modal from '../components/Modal'

const useModal = () => {
  const [isOpen, setOpen] = useState(false)

  return {
    isOpen,
    setOpen,
    Modal
  }
}

export default useModal