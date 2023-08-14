import {component$ ,useContext } from '@builder.io/qwik';
import RegistrationForm from '~/components/RegistrationForm';
import { authContext } from '../layout';

 
export default component$(() => {
  const auth = useContext(authContext);
  return (
    <>
    <div class="">
    {auth.value.length < 10 ? <RegistrationForm /> : <div class="text-xl">Already registred</div>}
    </div>
    </>
  )
});