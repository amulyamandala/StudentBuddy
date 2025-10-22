const { useState } = React;

function StudyBuddyApp() {
  // --- State for login ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // --- State for main app ---
  const [students, setStudents] = useState([
    { id: 2024001, name: 'Ravi Kumar', email: 'ravi.k@college.edu', age: 20, course: 'Computer Science' },
    { id: 2024002, name: 'Priya Sharma', email: 'priya.s@college.edu', age: 21, course: 'Business Administration' },
    { id: 2024003, name: 'Arjun Patel', email: 'arjun.p@college.edu', age: 19, course: 'Engineering' },
  ]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', email: '', age: '', course: '' });
  const [editing, setEditing] = useState(null);

  // --- Login Authentication (Simple, no backend) ---
  const hardcodedUser = { username: "student", password: "buddy" };

  function handleLogin(e) {
    e.preventDefault();
    if (
      loginForm.username === hardcodedUser.username &&
      loginForm.password === hardcodedUser.password
    ) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError("Invalid username or password.");
    }
  }

  // --- Main App Logic ---
  const handleAdd = () => {
    if (!form.name || !form.email || !form.age || !form.course) {
      alert('Please fill all fields');
      return;
    }

    if (editing) {
      setStudents(students.map((s) => (s.id === editing ? { ...form, id: editing } : s)));
      setEditing(null);
    } else {
      const newStudent = { ...form, id: Date.now() };
      setStudents([...students, newStudent]);
    }

    setForm({ name: '', email: '', age: '', course: '' });
  };

  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const handleEdit = (student) => {
    setForm(student);
    setEditing(student.id);
  };

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.course.toLowerCase().includes(search.toLowerCase())
  );

  // --- Render Login OR Main App ---
  if (!isLoggedIn) {
    return (
      <div className="card" style={{ textAlign: "center", marginTop: "60px", width: "350px" }}>
        <h2>🔒Login to StudentBuddy</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={loginForm.username}
            onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
          />
          <button type="submit" style={{ width: "100%", marginTop: "10px" }}>Login</button>
        </form>
        {loginError && <p style={{ color: "red", fontWeight: "bold" }}>{loginError}</p>}
        <div style={{ marginTop: "18px", color: "#555" }}>
          <p>Username: <b>student</b></p>
          <p>Password: <b>buddy</b></p>
        </div>
      </div>
    );
  }

  // --- Main App UI (with background image) ---
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("https://i.pinimg.com/1200x/5a/96/89/5a9689bd06a2597645da58af22a5e512.jpg")',

        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '30px'
      }}
    >
      <div style={{
        background: "rgba(255,255,255,0.92)",
        borderRadius: "16px",
        padding: "20px",
        maxWidth: "460px",
        margin: "0 auto"
      }}>
        <button
          style={{ background: "#666", float: "right", marginTop: "-15px", color: "white", borderRadius: "5px" }}
          onClick={() => setIsLoggedIn(false)}
        >Logout</button>
        <h3 style={{ clear: "right" }}>{editing ? 'Edit Student' : 'Add New Student'}</h3>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />
        <input
          type="text"
          placeholder="Course"
          value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}
        />
        <button onClick={handleAdd}>{editing ? 'Update' : 'Add Student'}</button>

        <div className="card" style={{ marginTop: "20px" }}>
          <h3>Search Students</h3>
          <input
            type="text"
            placeholder="Search by name or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filtered.map((s) => (
          <div className="card" key={s.id} style={{ marginTop: "18px" }}>
            <h4>{s.name}</h4>
            <p>Email: {s.email}</p>
            <p>Age: {s.age}</p>
            <p>Course: {s.course}</p>
            <button onClick={() => handleEdit(s)}>Edit</button>{" "}
            <button onClick={() => handleDelete(s.id)} style={{ background: "red", color: "white" }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<StudyBuddyApp />);
