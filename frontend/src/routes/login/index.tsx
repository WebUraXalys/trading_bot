import {component$, useContext } from '@builder.io/qwik';
import LoginForm from '~/components/LoginForm';
import { authContext } from '../layout';

 
export default component$(() => {
  const auth = useContext(authContext);

  return (
    <>
    <div class="">
    {auth.value.length < 10 ? <LoginForm /> : <div class="text-xl">Already signed in</div>}
    </div>
    </>
  )
});