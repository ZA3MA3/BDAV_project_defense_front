'use client'

import * as React from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { cn } from "../../../lib/utils"

// Define the props type based on your existing Input component
type InputProps = React.ComponentProps<"input">

const UserNumberInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const [showUserNumber, setShowUserNumber] = React.useState(false)
  const disabled = props.value === '' || props.value === undefined || props.disabled

  return (
    <div className="relative">
      <Input
        // type={showUserNumber ? 'text' : 'password'}
         type='text'
        className={cn('hide-usernumber-toggle pr-10', className)}
        ref={ref}
        {...props}
      />
      {/* <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowUserNumber((prev) => !prev)}
        disabled={disabled}
      >
        {showUserNumber && !disabled ? (
          <EyeIcon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
        )}
        <span className="sr-only">{showUserNumber ? 'Hide user number' : 'Show user number'}</span>
      </Button> */}
      {/* hides browsers password toggles */}
      <style>{`
        .hide-usernumber-toggle::-ms-reveal,
        .hide-usernumber-toggle::-ms-clear {
          visibility: hidden;
          pointer-events: none;
          display: none;
        }
      `}</style>
    </div>
  )
})

UserNumberInput.displayName = 'UserNumberInput'

const BirthdateInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const [showBirthdate, setShowBirthdate] = React.useState(false)
  const disabled = props.value === '' || props.value === undefined || props.disabled

  return (
    <div className="relative">
      <Input
        type={showBirthdate ? 'text' : 'password'}
        className={cn('hide-birthdate-toggle pr-10', className)}
        ref={ref}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowBirthdate((prev) => !prev)}
        disabled={disabled}
      >
        {showBirthdate && !disabled ? (
          <EyeIcon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
        )}
        <span className="sr-only">{showBirthdate ? 'Hide birthdate' : 'Show birthdate'}</span>
      </Button>
      {/* hides browsers password toggles */}
      <style>{`
        .hide-birthdate-toggle::-ms-reveal,
        .hide-birthdate-toggle::-ms-clear {
          visibility: hidden;
          pointer-events: none;
          display: none;
        }
      `}</style>
    </div>
  )
})

BirthdateInput.displayName = 'BirthdateInput'

export { UserNumberInput, BirthdateInput }