import Group from '../components/Playlists/Group'
import { useLoaderData } from 'react-router-dom';
import { getPlayList } from "../playlist";

export async function loader() {
  const playlist = await getPlayList();
  return { playlist };
}

export default function PlayList(props) {
  const { playlist } = useLoaderData();
  return <Group data={playlist} />;
};
