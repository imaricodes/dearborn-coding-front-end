import { useState, useEffect } from 'react';

export async function useMicPermission () {
    const [permission, setPermission] = useState(null);
    
    useEffect(() => {
        console.log('check mic permission');
        navigator.permissions.query({ name: 'microphone' }).then((result) => {
            console.log('mic premission in hook ', result.state)
        setPermission(result.state);
        });
    }, []);
    
    return permission;
}