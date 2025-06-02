import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4">
      <ul className="flex gap-4">
        <li><Link to="/" className="text-blue-600 font-semibold">Home</Link></li>
        <li><Link to="/segments">Segments</Link></li>
        <li><Link to="/segments/create">Create Segment</Link></li>
        <li><Link to="/campaigns">Campaigns</Link></li>
        <li><Link to="/campaigns/create">Create Campaign</Link></li>
      </ul>
    </nav>
  );
}
