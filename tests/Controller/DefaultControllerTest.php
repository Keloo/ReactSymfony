<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class DefaultControllerTest extends WebTestCase
{
    public function testShowIndex()
    {
        $client = static::createClient();
        $client->request('GET', '/');
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    public function testFakeLink()
    {
        $client = static::createClient();
        $client->request('POST', '/fake');
        $this->assertEquals(404, $client->getResponse()->getStatusCode());
    }
}