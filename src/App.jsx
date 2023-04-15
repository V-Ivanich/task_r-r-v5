import React from 'react'
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom'
import { useParams } from 'react-router-dom'

const NavBar = () => {
  return (
    <>
      <NavLink to='/users'>Users list page</NavLink>
    </>
  )
}

function App() {
  const usersData = [
    { name: 'User-1', id: 0 },
    { name: 'User-2', id: 1 },
    { name: 'User-3', id: 2 },
    { name: 'User-4', id: 3 },
    { name: 'User-5', id: 4 },
  ]
  const Home = () => {
    return <h1>Home Page!</h1>
  }

  const EditUserPage = ({ id }) => {
    const history = useHistory()
    const { pathname } = useLocation()
    const realPathName = `/users/${id}/edit`
    if (pathname !== realPathName) {
      history.push(realPathName)
    }
    return (
      <>
        <h1>Edit User Page!</h1>
        <NavLink to={`/users/${id}`}>User profile page</NavLink>
        <NavLink to={`/users/${+id + 1}`}>Another user page</NavLink>
        <NavLink to='/users'>Users List page</NavLink>
      </>
    )
  }

  function UserListPage() {
    const { userId, edit } = useParams()
    return (
      <>
        <h1>Users Layout</h1>
        <NavLink to='/'>Home page</NavLink>
        {!userId && !edit ? <h1>User List Page</h1> : ''}
        {userId ? (
          edit ? (
            <EditUserPage id={userId} />
          ) : (
            <UserPage users={usersData} userId={userId} />
          )
        ) : (
          usersData.map((user) => (
            <NavLink key={user.id} to={`users/${user.id}`}>
              {user.name}
            </NavLink>
          ))
        )}
      </>
    )
  }

  const UserPage = ({ userId, users }) => {
    const getUserId = (id) => {
      return users.find((u) => u.id.toString() === id)
    }
    const user = getUserId(userId)
    if (!user) {
      const history = useHistory()
      return history.push('/users')
    }
    return (
      <>
        <h1>User Page!</h1>
        <NavLink to='/users'>Users List page</NavLink>
        <NavLink to={`/users/${user.id}/edit`}>Edit this user</NavLink>
        <h3>{`${user.name} id: ${user.id}`}</h3>
      </>
    )
  }

  return (
    <div>
      <h1>App Layout</h1>
      <NavBar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/users/:userId?/:edit?' component={UserListPage} />
        <Redirect from='*' to='/' />
      </Switch>
    </div>
  )
}

export default App
